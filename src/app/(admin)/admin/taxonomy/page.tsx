import { AdminHeader } from "@/components/admin/header";
import { AdminShell } from "@/components/admin/shell";
import { TaxonomySheet } from "@/components/admin/taxonomy-sheet";
import { preloadQuery } from "convex/nextjs";
import { unstable_cache } from "next/cache";
import { api } from "../../../../../convex/_generated/api";
import { createProfessionAction } from "@/actions/taxonomy-actions";

const getProfessions = unstable_cache(
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
        </AdminShell>
    )
}