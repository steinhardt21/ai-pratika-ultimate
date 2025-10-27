import { AdminHeader } from "@/components/admin/header";
import { AdminShell } from "@/components/admin/shell";
import { NewContentButton } from "@/components/admin/content-creation-button";

export type ContentType = "workflow" | "resource"


export default function ContentPage() {
    return (
        <AdminShell>
            <AdminHeader heading="Contenuti"  text="Manage billing and your subscription plan.">
                <NewContentButton />
            </AdminHeader>
            
        </AdminShell>
    )
}