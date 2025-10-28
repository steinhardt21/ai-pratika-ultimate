import { AdminHeader } from "@/components/admin/header";
import { AdminShell } from "@/components/admin/shell";
import { ContentForm } from "@/components/admin/content-form-steps/content-form";

export type ContentType = "workflow" | "resource"


export default function ContentPage() {
    return (
        <AdminShell>
            <AdminHeader heading="Contenuti"  text="Manage billing and your subscription plan.">
                <ContentForm />
            </AdminHeader>
            
        </AdminShell>
    )
}