import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { NavigationSidebar } from "@/components/admin/nav-sidebar"
import { adminConfig } from "@/config/admin"
import { AdminHeader } from "@/components/admin/header"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider style={
      {
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties
    }>
      <NavigationSidebar items={adminConfig.sidebarNav} />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}