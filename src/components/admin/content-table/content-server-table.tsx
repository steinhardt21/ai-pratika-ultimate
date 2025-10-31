import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTableClient } from "./content-client-table"
import { api } from "../../../../convex/_generated/api"
import { Skeleton } from "@/components/ui/skeleton"
import { preloadQuery } from "convex/nextjs";
import { unstable_cache } from "next/cache"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const getWorkflows = unstable_cache(
    async () => {
        return await preloadQuery(api.article.getArticlesByType, { type: "workflow" });
    },
    ["workflows"],
    {
        tags: ["workflows"],
        revalidate: 60, // Cache for 60 seconds
    }
);

const getResources = unstable_cache(
    async () => {
        return await preloadQuery(api.article.getArticlesByType, { type: "resource" });
    },
    ["resources"],
    {
        tags: ["resources"],
        revalidate: 60, // Cache for 60 seconds
    }
);

export async function DataTableServer() {
    const [preloadedWorkflows, preloadedResources] = await Promise.all([
        getWorkflows(),
        getResources()
    ]); 
    
    const toolbarLeft = (
        <>
            <Label htmlFor="view-selector" className="sr-only">
                View
            </Label>
            <Select defaultValue="workflows">
                <SelectTrigger className="flex w-fit @4xl/main:hidden" size="sm" id="view-selector">
                    <SelectValue placeholder="Select a view" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="workflows">Workflows</SelectItem>
                    <SelectItem value="resources">Resources</SelectItem>
                </SelectContent>
            </Select>
            <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
                <TabsTrigger value="workflows">Workflows</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
        </>
    );

    return (
        <Tabs defaultValue="workflows" className="w-full flex-col justify-start gap-6">
            <TabsContent value="workflows" className="flex flex-col gap-4 overflow-auto px-4 lg:px-6">
                <DataTableClient preloadedArticles={preloadedWorkflows} toolbarLeft={toolbarLeft} />
            </TabsContent>

            <TabsContent value="resources" className="flex flex-col gap-4 overflow-auto px-4 lg:px-6">
                <DataTableClient preloadedArticles={preloadedResources} toolbarLeft={toolbarLeft} />
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
                    <Skeleton className="h-10 w-28" />
                    <Skeleton className="h-10 w-28" />
                </div>
                <Skeleton className="h-10 w-40" />
            </div>

            {/* Tabs Skeleton */}
            <Tabs defaultValue="workflows" className="w-full flex-col justify-start gap-6">

                <TabsContent value="workflows" className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
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
