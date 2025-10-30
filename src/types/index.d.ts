import type { Icons } from "~/components/icons"
import type React from "react"

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem & {
  icon?: React.ComponentType<any>
}

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
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

export type SiteConfig = {
    name: string
    description: string
    url: string
    ogImage: string
    links: {
        twitter: string
        github: string
    }
}
  
export type MarketingConfig = {
    mainNav: MainNavItem[]
}

export type AdminConfig = {
    adminNav: MainNavItem[] 
}