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
