import { AdminHeader } from "@/components/admin/header";
import { AdminShell } from "@/components/admin/shell";
import { TaxonomySheet } from "@/components/admin/taxonomy-sheet";
import { preloadQuery } from "convex/nextjs";
import { unstable_cache } from "next/cache";
import { api } from "../../../../../convex/_generated/api";
import { createProfessionAction } from "@/actions/taxonomy-actions";
import { Suspense } from "react";
import { TaxonomyTableServer } from "@/components/admin/taxonomy-table/taxonomy-server-table";

export const getProfessions = unstable_cache(
    async () => {
        return await preloadQuery(api.profession.getProfessions);
    },
    ["professions"],
    {
        tags: ["professions"],
        revalidate: 60,
    }
);

export default async function TaxonomyPage() {
    const preloadedProfessions = await getProfessions();

    return (
        <AdminShell>
            <AdminHeader heading="Taxonomy">
                <TaxonomySheet
                    preloadedProfessions={preloadedProfessions}
                    createProfessionAction={createProfessionAction}
                />
            </AdminHeader>
            <main className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <Suspense fallback={TaxonomyTableServer.Skeleton()}>
                            <TaxonomyTableServer />
                        </Suspense>
                    </div>
                </div>
            </main>
        </AdminShell>
    )
}