import { Tabs, TabsContent } from "@/components/ui/tabs"
import { DataTableClient } from "./content-client-table"
import { api } from "../../../../convex/_generated/api"
import { Skeleton } from "@/components/ui/skeleton"
import { preloadQuery } from "convex/nextjs";
import { unstable_cache } from "next/cache"

const getArticles = unstable_cache(
    async (type: "resource" | "workflow") => {
        return await preloadQuery(api.article.getArticlesByType, { type });
    },
    ["articles-by-type"],
    {
        tags: ["articles"],
        revalidate: 60, // Cache for 60 seconds
    }
);

export async function DataTableServer() {
    const preloadedArticles = await getArticles("resource");

    return (
        <Tabs defaultValue="outline" className="w-full flex-col justify-start gap-6">
            <DataTableClient preloadedArticles={preloadedArticles} />

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

DataTableServer.Skeleton = function DataTableServerSkeleton() {
    return (
        <>
            {/* Table Toolbar Skeleton */}
            <div className="flex items-center justify-between px-4 lg:px-6">
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-10 w-20" />
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-28" />
                    <Skeleton className="h-10 w-36" />
                </div>
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-10 w-10" />
                    <Skeleton className="h-10 w-32" />
                </div>
            </div>

            {/* Tabs Skeleton */}
            <Tabs defaultValue="outline" className="w-full flex-col justify-start gap-6">

                <TabsContent value="outline" className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
                    <div className="overflow-hidden rounded-lg border">
                        {/* Table Header Skeleton */}
                        <div className="bg-muted p-4">
                            <div className="flex items-center space-x-4">
                                <Skeleton className="h-4 w-4" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-4" />
                            </div>
                        </div>

                        {/* Table Rows Skeleton */}
                        <div className="divide-y">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="p-4">
                                    <div className="flex items-center space-x-4">
                                        <Skeleton className="h-4 w-4" />
                                        <Skeleton className="h-4 w-40" />
                                        <div className="flex flex-col space-y-1">
                                            <Skeleton className="h-4 w-24" />
                                            <Skeleton className="h-3 w-16" />
                                        </div>
                                        <Skeleton className="h-6 w-16 rounded-full" />
                                        <Skeleton className="h-4 w-4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pagination Skeleton */}
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-32" />
                        <div className="flex items-center space-x-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-20" />
                            <Skeleton className="h-4 w-20" />
                            <div className="flex space-x-1">
                                <Skeleton className="h-10 w-10" />
                                <Skeleton className="h-10 w-10" />
                                <Skeleton className="h-10 w-10" />
                                <Skeleton className="h-10 w-10" />
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </>
    )
}
