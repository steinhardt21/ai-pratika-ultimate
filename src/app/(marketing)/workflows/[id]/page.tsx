import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import { ViewTransition } from "react";
type WorkflowPageProps = {
    params: Promise<{ id: string }>;
}

export async function generateMetadata(props: WorkflowPageProps): Promise<Metadata> {
    const params = await props.params;
    const article = await fetchQuery(api.article.getWorkflowArticleById, { id: params.id as Id<"article">});
  
    if (!article) {
      return notFound();
    }
  
    const title = `${article.title} | AI Pratika`;
  
    return {
      title,
      openGraph: {
        title,
        images: [article.imageUrl || ""],
      },
    };
  }

export async function generateStaticParams() {
    const workflows = await fetchQuery(api.article.getArticlesByType, { type: "workflow" });
    return workflows.map((workflow) => ({
        id: workflow._id,
    }));
}

export default async function WorkflowPage({ params }: WorkflowPageProps) {
    const { id } = await params;
    const articleWorkflow = await fetchQuery(api.article.getWorkflowArticleById, { id: id as Id<"article">});

    if (!articleWorkflow) {
        return notFound();
      }
    console.log('view transition: ', articleWorkflow._id);
    return (
        <div>
            <h1>{articleWorkflow.title}</h1>
            <ViewTransition name="image-view-transition">
            <Image src={articleWorkflow.imageUrl!} alt={articleWorkflow.title || ""} width={1000} height={1000} />
        </ViewTransition>
        </div>
    );
}