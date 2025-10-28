import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createResource = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    url: v.string(),
    authorId: v.string(),
    faqs: v.optional(v.array(v.object({
      question: v.string(),
      answer: v.string(),
    }))),
  },
  handler: async (ctx, args) => {
    // Create the resource
    const resourceId = await ctx.db.insert("resource", {
      title: args.title,
      description: args.description,
      url: args.url,
      authorId: args.authorId,
      updatedAt: Date.now(),
    });

    // Create associated FAQs if provided
    if (args.faqs && args.faqs.length > 0) {
      await Promise.all(
        args.faqs.map(faq =>
          ctx.db.insert("faq", {
            type: "article",
            contentId: resourceId,
            question: faq.question,
            answer: faq.answer,
            updatedAt: Date.now(),
          })
        )
      );
    }

    return resourceId;
  },
});
