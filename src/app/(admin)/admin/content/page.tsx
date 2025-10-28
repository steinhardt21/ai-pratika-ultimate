import { fetchMutation } from "convex/nextjs";
import { revalidatePath } from "next/cache";
import { AdminHeader } from "@/components/admin/header";
import { AdminShell } from "@/components/admin/shell";
import { ContentForm } from "@/components/admin/content-form-steps/content-form";

import { api } from "@/../convex/_generated/api";


export type ContentType = "workflow" | "resource"

export default async function ContentPage() {

  async function createResource(formData: FormData) {
    "use server";
    
    console.log('server action called');
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const url = formData.get("url") as string;
    const authorId = formData.get("authorId") as string;
    
    // Parse FAQs if they exist (assuming they're passed as JSON string)
    const faqsData = formData.get("faqs") as string;
    const faqs = faqsData ? JSON.parse(faqsData) : undefined;

    await fetchMutation(api.resource.createResource, {
      title,
      description,
      url,
      authorId: authorId as any, // Type assertion for Convex ID
      faqs,
    });
    
    revalidatePath("/admin/content");
  }

  return (
    <AdminShell>
      <AdminHeader heading="Contenuti">
        <ContentForm createResourceAction={createResource} />
      </AdminHeader>
      <main className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            
          </div>
        </div>
      </main>
    </AdminShell>
  )
}