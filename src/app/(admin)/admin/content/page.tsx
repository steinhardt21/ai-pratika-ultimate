import { AdminHeader } from "@/components/admin/header";
import { AdminShell } from "@/components/admin/shell";
import { ContentForm } from "@/components/admin/content-form-steps/content-form";
import { createResourceArticle } from "@/actions/content-actions";
import { DataTableServer } from "@/components/admin/content-table/content-server-table";
import { Suspense } from "react";

export type ContentType = "workflow" | "resource"

export default async function ContentPage() {
  
  return (
    <AdminShell>
      <AdminHeader heading="Contenuti">
        <ContentForm createResourceAction={createResourceArticle} />
      </AdminHeader>
      <main className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <Suspense fallback={DataTableServer.Skeleton()}>
              <DataTableServer/>
            </Suspense>
          </div>
        </div>
      </main>
    </AdminShell>
  )
}