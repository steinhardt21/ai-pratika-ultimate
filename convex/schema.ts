import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Enum definitions as union types
const roleEnum = v.union(v.literal("admin"), v.literal("editor"), v.literal("member"));
const articleTypeEnum = v.union(v.literal("tutorial"), v.literal("news"), v.literal("workflow"), v.literal("resource"));
const articleStatusEnum = v.union(v.literal("active"), v.literal("draft"), v.literal("archived"));
const difficultyEnum = v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced"));
const payEnum = v.union(v.literal("free"), v.literal("freemium"), v.literal("paid"));

export default defineSchema({
  users: defineTable({
    clerkId: v.optional(v.string()),
    email: v.optional(v.string()),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    updatedAt: v.optional(v.number()), // Timestamp in milliseconds (Date.now())
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"])
    .index("by_creation_time", ["_creationTime"]),

  membership: defineTable({
    userId: v.id("users"),
    role: roleEnum,
    updatedAt: v.optional(v.number()), // Timestamp in milliseconds (Date.now())
  })
    .index("by_user_id", ["userId"])
    .index("by_role", ["role"])
    .index("by_creation_time", ["_creationTime"]),

  profession: defineTable({
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    updatedAt: v.optional(v.number()), // Timestamp in milliseconds (Date.now())
  })
    .index("by_name", ["name"])
    .index("by_creation_time", ["_creationTime"]),

  aiInstrument: defineTable({
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    updatedAt: v.optional(v.number()), // Timestamp in milliseconds (Date.now())
  })
    .index("by_name", ["name"])
    .index("by_creation_time", ["_creationTime"]),

  savedArticle: defineTable({
    articleId: v.id("article"),
    userId: v.id("users"),
    updatedAt: v.optional(v.number()), // Timestamp in milliseconds (Date.now())
  })
    .index("by_article_id", ["articleId"])
    .index("by_user_id", ["userId"])
    .index("by_user_article", ["userId", "articleId"])
    .index("by_creation_time", ["_creationTime"]),

  article: defineTable({
    title: v.optional(v.string()),
    type: articleTypeEnum,
    status: articleStatusEnum,
    targetProfessions: v.array(v.id("profession")),
    targetAiInstruments: v.array(v.id("aiInstrument")),
    contentId: v.optional(v.id("workflow")), // This could reference workflow, news, or resource
    updatedAt: v.optional(v.number()), 
  })
    .index("by_type_status", ["type", "status"])
    .index("by_creation_time", ["_creationTime"])
    .index("by_content_id", ["contentId"])
    .index("by_status", ["status"])
    .index("by_type", ["type"]),

  workflow: defineTable({
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    videoUrl: v.optional(v.string()),
    authorId: v.id("users"),
    difficulty: difficultyEnum,
    timing: v.optional(v.string()),
    pay: payEnum,
    updatedAt: v.optional(v.number()), 
  })
    .index("by_author_id", ["authorId"])
    .index("by_creation_time", ["_creationTime"])
    .index("by_difficulty", ["difficulty"])
    .index("by_pay", ["pay"])
    .index("by_difficulty_pay", ["difficulty", "pay"]),

  faq: defineTable({
    workflowId: v.optional(v.id("workflow")),
    resourceId: v.optional(v.id("resource")),
    question: v.optional(v.string()),
    answer: v.optional(v.string()),
    updatedAt: v.optional(v.number()), 
  })
    .index("by_workflow_id", ["workflowId"])
    .index("by_resource_id", ["resourceId"])
    .index("by_creation_time", ["_creationTime"]),

  news: defineTable({
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    authorId: v.id("users"),
    updatedAt: v.optional(v.number()), 
  })
    .index("by_author_id", ["authorId"])
    .index("by_creation_time", ["_creationTime"]),

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
    .index("by_order", ["order"])
    .index("by_creation_time", ["_creationTime"]),

  resource: defineTable({
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    url: v.optional(v.string()),
    authorId: v.id("users"),
    updatedAt: v.optional(v.number()), 
  })
    .index("by_author_id", ["authorId"])
    .index("by_creation_time", ["_creationTime"])
    .index("by_url", ["url"]),
});
