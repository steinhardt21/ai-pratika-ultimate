import { Tabs, TabsContent } from "@/components/ui/tabs"
import { DataTableClient } from "./content-client-table"
import { api } from "../../../../convex/_generated/api"
import { Preloaded } from "convex/react";
import { Suspense } from "react";


interface DataTableServerProps {
    preloadedArticles:  Preloaded<typeof api.article.getArticlesByType>
}

export async function DataTableServer({ preloadedArticles }: DataTableServerProps) {
    return (
        <Tabs defaultValue="outline" className="w-full flex-col justify-start gap-6">
            <Suspense fallback={<div>Loading...</div>}>
                <DataTableClient preloadedArticles={preloadedArticles} />
            </Suspense>

            <TabsContent value="past-performance" className="flex flex-col px-4 lg:px-6">
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
            </TabsContent>
            <TabsContent value="key-personnel" className="flex flex-col px-4 lg:px-6">
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
            </TabsContent>
            <TabsContent value="focus-documents" className="flex flex-col px-4 lg:px-6">
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
            </TabsContent>
        </Tabs>
    )
}
