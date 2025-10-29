import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getArticlesByType = query({
  args: {
    type: v.union(v.literal("workflow"), v.literal("resource")),
  },
  handler: async (ctx, args) => {
    const articles = await ctx.db
      .query("article")
      .withIndex("by_type", (q) => q.eq("type", args.type))
      .collect();

    return articles.map((article) => ({
      _id: article._id,
      _creationTime: article._creationTime,
      title: article.title,
      type: article.type,
      status: article.status,
      targetProfessions: article.targetProfessions,
      targetAiInstruments: article.targetAiInstruments,
      contentId: article.contentId,
      updatedAt: article.updatedAt,
    }));
  },
});

export const createResourceArticle = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    url: v.string(),
    authorId: v.string(),
    targetProfessions: v.array(v.id("profession")),
    targetAiInstruments: v.array(v.id("aiInstrument")),
    faqs: v.optional(v.array(v.object({
      question: v.string(),
      answer: v.string(),
    }))),
  },
  handler: async (ctx, args) => {
    // First, create the resource
    const resourceId = await ctx.db.insert("resource", {
      title: args.title,
      description: args.description,
      url: args.url,
      authorId: args.authorId,
      updatedAt: Date.now(),
    });

    // Then, create the article of type resource that references the resource
    const articleId = await ctx.db.insert("article", {
      title: args.title,
      type: "resource",
      status: "active",
      targetProfessions: args.targetProfessions,
      targetAiInstruments: args.targetAiInstruments,
      contentId: resourceId,
      updatedAt: Date.now(),
    });

    // Create associated FAQs if provided
    if (args.faqs && args.faqs.length > 0) {
      await Promise.all(
        args.faqs.map(faq =>
          ctx.db.insert("faq", {
            type: "article",
            contentId: articleId,
            question: faq.question,
            answer: faq.answer,
            updatedAt: Date.now(),
          })
        )
      );
    }

    return { articleId, resourceId };
  },
});

export const createWorkflowArticle = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    difficulty: v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced")),
    timing: v.string(),
    pay: v.union(v.literal("free"), v.literal("freemium"), v.literal("paid")),
    authorId: v.string(),
    targetProfessions: v.array(v.id("profession")),
    targetAiInstruments: v.array(v.id("aiInstrument")),
    imageUrl: v.optional(v.string()),
    steps: v.array(v.object({
      title: v.string(),
      text: v.string(),
      image: v.optional(v.string()),
    })),
    faqs: v.optional(v.array(v.object({
      question: v.string(),
      answer: v.string(),
    }))),
  },
  handler: async (ctx, args) => {
    // First, create the workflow
    const workflowId = await ctx.db.insert("workflow", {
      title: args.title,
      description: args.description,
      difficulty: args.difficulty,
      timing: args.timing,
      pay: args.pay,
      authorId: args.authorId,
      imageUrl: args.imageUrl,
      updatedAt: Date.now(),
    });

    // Then, create the article of type workflow that references the workflow
    const articleId = await ctx.db.insert("article", {
      title: args.title,
      type: "workflow",
      status: "active",
      targetProfessions: args.targetProfessions,
      targetAiInstruments: args.targetAiInstruments,
      contentId: workflowId,
      updatedAt: Date.now(),
    });

    // Create workflow steps
    if (args.steps && args.steps.length > 0) {
      await Promise.all(
        args.steps.map((step, index) =>
          ctx.db.insert("step", {
            workflowId: workflowId,
            order: index + 1,
            title: step.title,
            content: step.text,
            imageUrl: step.image,
            updatedAt: Date.now(),
          })
        )
      );
    }

    // Create associated FAQs if provided
    if (args.faqs && args.faqs.length > 0) {
      await Promise.all(
        args.faqs.map(faq =>
          ctx.db.insert("faq", {
            type: "article",
            contentId: articleId,
            question: faq.question,
            answer: faq.answer,
            updatedAt: Date.now(),
          })
        )
      );
    }

    return { articleId, workflowId };
  },
});
