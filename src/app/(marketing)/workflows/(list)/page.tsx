import { api } from "../../../../../convex/_generated/api"
import { fetchQuery } from "convex/nextjs"
import { unstable_cache } from "next/cache"

import { ArticleWorkflowCard } from "@/components/marketing/article-workflow-card"
import { Doc } from "../../../../../convex/_generated/dataModel";

const getWorkflows = unstable_cache(
    async () => {
        return await fetchQuery(api.article.getArticlesByType, { type: "workflow" });
    },
    ["workflows"],
    {
        tags: ["workflows"],
        revalidate: 60,
    }
);

export default async function WorkflowsPage() {
    const preloadedWorkflows = await getWorkflows() as (Doc<"article"> & { 
        targetProfessionNames: string[];
        targetAiInstrumentNames: string[];
        authorId: string;
        content: Doc<"workflow"> 
    })[];

    return (
        <section className="px-6 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8 md:py-10 bg-aipratika-cream dark:bg-aipratika-purple-dark bg-texture">
            <div className="container mx-auto max-w-6xl">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-aipratika-purple dark:text-aipratika-cream">
                        {preloadedWorkflows.length} workflow{preloadedWorkflows.length !== 1 ? 's' : ''}
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {preloadedWorkflows.map((articleWorkflow) => (
                        <ArticleWorkflowCard key={articleWorkflow._id} articleWorkflow={articleWorkflow} />
                    ))}
                </div>
            </div>
        </section>
    )
}