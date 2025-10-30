import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Enum definitions as union types
const roleEnum = v.union(v.literal("admin"), v.literal("editor"), v.literal("member"));
const articleTypeEnum = v.union(v.literal("tutorial"), v.literal("news"), v.literal("workflow"), v.literal("resource"));
const articleStatusEnum = v.union(v.literal("active"), v.literal("draft"), v.literal("archived"));
const difficultyEnum = v.optional(v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced")));
const payEnum = v.optional(v.union(v.literal("free"), v.literal("freemium"), v.literal("paid")));

export default defineSchema({
  user: defineTable({
    clerkId: v.optional(v.string()),
    email: v.optional(v.string()),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    updatedAt: v.optional(v.number()), // Timestamp in milliseconds (Date.now())
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),

  membership: defineTable({
    userId: v.id("user"),
    role: roleEnum,
    updatedAt: v.optional(v.number()), // Timestamp in milliseconds (Date.now())
  })
    .index("by_user_id", ["userId"])
    .index("by_role", ["role"]),

  profession: defineTable({
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    updatedAt: v.optional(v.number()), // Timestamp in milliseconds (Date.now())
  })
    .index("by_name", ["name"]),

  aiInstrument: defineTable({
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    updatedAt: v.optional(v.number()), // Timestamp in milliseconds (Date.now())
  })
    .index("by_name", ["name"]),

  savedArticle: defineTable({
    articleId: v.id("article"),
    userId: v.id("user"),
    updatedAt: v.optional(v.number()), // Timestamp in milliseconds (Date.now())
  })
    .index("by_article_id", ["articleId"])
    .index("by_user_id", ["userId"])
    .index("by_user_article", ["userId", "articleId"]),

  article: defineTable({
    title: v.optional(v.string()),
    type: articleTypeEnum,
    status: articleStatusEnum,
    targetProfessions: v.array(v.id("profession")),
    targetAiInstruments: v.array(v.id("aiInstrument")),
    contentId: v.optional(v.string()), // ID that can reference workflow, news, or resource
    updatedAt: v.optional(v.number()), 
    imageUrl: v.optional(v.string()),
    videoUrl: v.optional(v.string()),
    description: v.optional(v.string()),
    difficulty: difficultyEnum,
    pay: payEnum,
  })
    .index("by_type_status", ["type", "status"])
    .index("by_content_id", ["contentId"])
    .index("by_status", ["status"])
    .index("by_type", ["type"]),

  workflow: defineTable({
    authorId: v.string(),  
    timing: v.optional(v.string()),
    
    updatedAt: v.optional(v.number()), 
  })
    .index("by_author_id", ["authorId"]),

  faq: defineTable({
    type: v.union(v.literal("workflow"), v.literal("article")),
    contentId: v.string(), // ID of the workflow or article
    question: v.optional(v.string()),
    answer: v.optional(v.string()),
    updatedAt: v.optional(v.number()), 
  })
    .index("by_type", ["type"])
    .index("by_content_id", ["contentId"])
    .index("by_type_content", ["type", "contentId"]),

  news: defineTable({
    authorId: v.id("user"),
    updatedAt: v.optional(v.number()), 
  })
    .index("by_author_id", ["authorId"]),

  step: defineTable({
    order: v.number(),
    workflowId: v.id("workflow"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    updatedAt: v.optional(v.number()), 
  })
    .index("by_workflow_id", ["workflowId"])
    .index("by_workflow_order", ["workflowId", "order"])
    .index("by_order", ["order"]),

  resource: defineTable({
    url: v.optional(v.string()),
    // authorId: v.id("user"),
    authorId: v.string(),
    updatedAt: v.optional(v.number()), 
  })
    // .index("by_author_id", ["authorId"])
    .index("by_url", ["url"]),
});
