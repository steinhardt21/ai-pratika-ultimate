import { SidebarProvider } from "@/components/ui/sidebar"
import { NavigationSidebar } from "@/components/admin/nav-sidebar"
import { adminConfig } from "@/config/admin"

export default function AdminLayout({children}: {children: React.ReactNode}) {
    return (
        <SidebarProvider>
          <NavigationSidebar items={adminConfig.sidebarNav} />
          <main>
            {children}
          </main>
        </SidebarProvider>
      )
}