import { AdminHeader } from "@/components/admin/header";
import { AdminShell } from "@/components/admin/shell";
import { ContentForm } from "@/components/admin/content-form-steps/content-form";

export type ContentType = "workflow" | "resource"


export default function ContentPage() {
    return (
        <AdminShell>
            <AdminHeader heading="Contenuti">
                <ContentForm />
            </AdminHeader>
            <main className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        content page
                    </div>
                </div>
            </main>
        </AdminShell>
    )
}