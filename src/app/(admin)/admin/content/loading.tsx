import { AdminHeader } from "@/components/admin/header";
import { AdminShell } from "@/components/admin/shell";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

export default function ContentLoading() {
    return (
        <AdminShell>
            <AdminHeader heading="Contenuti">
                <Button variant="outline" size="sm">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading...
                </Button>
            </AdminHeader>
            <main className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
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
                    </div>
                </div>
            </main>
        </AdminShell>
    )
}