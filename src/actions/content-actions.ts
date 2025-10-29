"use server";

import { fetchMutation } from "convex/nextjs";
import { revalidatePath } from "next/cache";
import { api } from "@/../convex/_generated/api";

export async function createResourceArticle(formData: FormData): Promise<void> {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const url = formData.get("url") as string;
  const authorId = formData.get("authorId") as string;
  const targetProfessions = JSON.parse(formData.get("targetProfessions") as string || "[]");
  const targetAiInstruments = JSON.parse(formData.get("targetAiInstruments") as string || "[]");
  
  // Parse FAQs if they exist (assuming they're passed as JSON string)
  const faqsData = formData.get("faqs") as string;
  const faqs = faqsData ? JSON.parse(faqsData) : undefined;

  await fetchMutation(api.article.createResourceArticle, {
    title,
    description,
    url,
    authorId: authorId as string, // Type assertion for Convex ID
    targetProfessions,
    targetAiInstruments,
    faqs,
  });
  
  revalidatePath("/admin/content");
}

export async function createWorkflowArticle(formData: FormData): Promise<void> {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const difficulty = formData.get("difficulty") as "beginner" | "intermediate" | "advanced";
  const timing = formData.get("timing") as string;
  const pay = formData.get("pay") as "free" | "freemium" | "paid";
  const authorId = formData.get("authorId") as string;
  const imageUrl = formData.get("imageUrl") as string | null;
  const targetProfessions = JSON.parse(formData.get("targetProfessions") as string || "[]");
  const targetAiInstruments = JSON.parse(formData.get("targetAiInstruments") as string || "[]");
  
  // Parse steps (assuming they're passed as JSON string)
  const stepsData = formData.get("steps") as string;
  const steps = stepsData ? JSON.parse(stepsData) : [];
  
  // Parse FAQs if they exist (assuming they're passed as JSON string)
  const faqsData = formData.get("faqs") as string;
  const faqs = faqsData ? JSON.parse(faqsData) : undefined;

  await fetchMutation(api.article.createWorkflowArticle, {
    title,
    description,
    difficulty,
    timing,
    pay,
    authorId,
    imageUrl: imageUrl || undefined,
    targetProfessions,
    targetAiInstruments,
    steps,
    faqs,
  });
  
  revalidatePath("/admin/content");
}
