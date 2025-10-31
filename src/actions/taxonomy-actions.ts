'use server'

import { fetchMutation } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath, revalidateTag } from "next/cache";
    
export async function createProfessionAction(formData: FormData): Promise<void> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  await fetchMutation(api.profession.createProfession, {
    name,
    description,
    clerkId: userId,
  });

  revalidateTag("professions");
}