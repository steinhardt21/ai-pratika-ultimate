import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const createProfession = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.query("user").withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId)).first();

    if (!user) {
      throw new Error("User not found");
    }

    return await ctx.db.insert("profession", {
      name: args.name,
      description: args.description,
      status: "active",
      createdBy: user._id,
    });
  },
});

export const getProfessions = query({
  handler: async (ctx) => {
    return await ctx.db.query("profession").collect();
  },
});