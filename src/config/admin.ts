import type { AdminConfig } from "@/types"
import { Icons } from "@/components/icons"

export const adminConfig: AdminConfig = {
  mainNav: [],
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/admin",
      icon: "logo",
    },
    {
      title: "Contenuti",
      href: "/admin/contenuti",
      icon: "post",
    },
    {
      title: "Taxonomy",
      href: "/admin/taxonomy",
      icon: "page",
    },
    {
      title: "Utenti",
      href: "/admin/utenti",
      icon: "user",
    },
  ],
}