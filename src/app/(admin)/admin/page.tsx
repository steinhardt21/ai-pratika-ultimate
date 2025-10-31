import { AdminHeader } from "@/components/admin/header";
import { AdminShell } from "@/components/admin/shell";

export default function AdminPage() {
    return (
        <AdminShell>
            <AdminHeader heading="Dashboard" />
        </AdminShell>
    )
}