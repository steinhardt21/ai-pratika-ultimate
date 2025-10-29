import type { AdminConfig } from "@/types"

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
      href: "/admin/content",
      icon: "post",
    },
    {
      title: "Taxonomy",
      href: "/admin/taxonomy",
      icon: "page",
      disabled: true,
    },
    {
      title: "Utenti",
      href: "/admin/utenti",
      icon: "user",
      disabled: true,
    },
  ],
}