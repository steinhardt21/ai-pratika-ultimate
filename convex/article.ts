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
      imageUrl: article.imageUrl,
      videoUrl: article.videoUrl,
      description: article.description,
      difficulty: article.difficulty,
      pay: article.pay,
    }));
  },
});

export const getWorkflowArticleById = query({
  args: {
    id: v.id("article"),
  },
  handler: async (ctx, args) => {
    // Get the article
    const article = await ctx.db.get(args.id);
    
    if (!article || article.type !== "workflow") {
      return null;
    }

    // Get the workflow data using a query instead of direct get
    const workflow = article.contentId 
      ? await ctx.db
          .query("workflow")
          .filter((q) => q.eq(q.field("_id"), article.contentId))
          .first()
      : null;

    // Get the workflow steps ordered by step order
    const steps = workflow 
      ? await ctx.db
          .query("step")
          .withIndex("by_workflow_id", (q) => q.eq("workflowId", workflow._id))
          .order("asc")
          .collect()
      : [];

    // Sort steps by order to ensure correct sequence
    const sortedSteps = steps.sort((a, b) => a.order - b.order);

    // Get FAQs associated with this article
    const faqs = await ctx.db
      .query("faq")
      .withIndex("by_type_content", (q) => 
        q.eq("type", "article").eq("contentId", article._id)
      )
      .collect();

    return {
      _id: article._id,
      _creationTime: article._creationTime,
      title: article.title,
      description: article.description,
      type: article.type,
      status: article.status,
      difficulty: article.difficulty,
      pay: article.pay,
      targetProfessions: article.targetProfessions,
      targetAiInstruments: article.targetAiInstruments,
      imageUrl: article.imageUrl,
      videoUrl: article.videoUrl,
      updatedAt: article.updatedAt,
      workflow: workflow ? {
        _id: workflow._id,
        _creationTime: workflow._creationTime,
        authorId: workflow.authorId,
        timing: workflow.timing,
        updatedAt: workflow.updatedAt,
      } : null,
      steps: sortedSteps.map(step => ({
        _id: step._id,
        _creationTime: step._creationTime,
        order: step.order,
        title: step.title,
        content: step.content,
        imageUrl: step.imageUrl,
        updatedAt: step.updatedAt,
      })),
      faqs: faqs.map(faq => ({
        _id: faq._id,
        _creationTime: faq._creationTime,
        question: faq.question,
        answer: faq.answer,
        updatedAt: faq.updatedAt,
      })),
    };
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
      url: args.url,
      authorId: args.authorId,
      updatedAt: Date.now(),
    });

    // Then, create the article of type resource that references the resource
    const articleId = await ctx.db.insert("article", {
      description: args.description,
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
      timing: args.timing,
      authorId: args.authorId,  
      updatedAt: Date.now(),
    });

    // Then, create the article of type workflow that references the workflow
    const articleId = await ctx.db.insert("article", {
      description: args.description,
      difficulty: args.difficulty as "beginner" | "intermediate" | "advanced",
      pay: args.pay,
      title: args.title,
      type: "workflow",
      status: "active",
      targetProfessions: args.targetProfessions,
      targetAiInstruments: args.targetAiInstruments,
      contentId: workflowId,
      updatedAt: Date.now(),
      imageUrl: args.imageUrl,

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
