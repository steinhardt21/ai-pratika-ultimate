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
    authorId: authorId as any, // Type assertion for Convex ID
    targetProfessions,
    targetAiInstruments,
    faqs,
  });
  
  revalidatePath("/admin/content");
}
