import type { Icon } from "lucide-react"

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: Icon
} & (
    | {
      href: string
      items?: never
    }
    | {
      href?: string
      items: NavLink[]
    }
  )

export type AdminConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}
