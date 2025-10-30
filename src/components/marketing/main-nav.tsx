import * as React from "react"
import type { MainNavItem } from "@/types"
import { MainNavButton } from "./main-nav-button"
// import { Icons } from "~/components/icons"
// import { MobileNav } from "~/components/mobile-nav"

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
}

export function MainNav({ items, children }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      {items?.length ? (
        <nav className="hidden gap-2 md:flex">
          {items.map((item, index) => (
            <MainNavButton key={index} item={item} />
          ))}
        </nav>
      ) : null}
      {/* Mobile menu button - uncomment when needed
      <button
        className="flex items-center space-x-2 md:hidden text-aipratika-green hover:text-aipratika-orange transition-colors"
      >
        <span className="font-bold">Menu</span>
      </button>
      */}
      {/* {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )} */}
    </div>
  )
}