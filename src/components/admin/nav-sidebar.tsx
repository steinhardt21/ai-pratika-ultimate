'use client'

import { Icons } from "@/components/icons"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "../ui/separator"
import { SidebarNavItem } from "@/types"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

interface NavigationSidebarProps {
  items: SidebarNavItem[]
}

export function NavigationSidebar({ items }: NavigationSidebarProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [optimisticPath, setOptimisticPath] = useState(pathname)


  useEffect(() => {
    setMounted(true)
  }, [])


  const handleNavigation = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    if (href === pathname) return // Don't navigate to current page
    
    // Immediately update the sidebar UI (optimistic update)
    setOptimisticPath(href)
    
    // Wrap navigation in transition to track loading state
    startTransition(() => {
      router.push(href)
    })
  }

  // Sync optimistic path when actual pathname changes (after navigation completes)
  if (pathname !== optimisticPath && !isPending) {
    setOptimisticPath(pathname)
  }

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
            <SidebarMenuButton
              asChild
            >
              <SidebarMenuItem>
                <Icons.laptop className="h-4 w-4" />
                <span className="text-base font-semibold">Admin Area</span>
              </SidebarMenuItem>
                {/* <span className="text-base font-semibold">Admin Area</span> */}
            </SidebarMenuButton>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
            {items.map((item, index) => {
            const Icon = Icons[item.icon as keyof typeof Icons] || "arrowRight"
            const isActive = mounted && optimisticPath === item.href
            const isLoading = isPending && isActive
            return (
              item.href && (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton 
                    disabled={item.disabled || false} 
                    asChild 
                    tooltip={item.title}
                    className={cn(
                      "min-w-8 duration-200 ease-linear",
                      isActive && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
                    )}
                    onClick={(e) => handleNavigation(e, item.href!)}
                  >
                    <Link href={item.disabled ? "/" : item.href}>
                      <Icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                      {isLoading && (
                        <div className="ml-auto">
                          <div className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        </div>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            )
          })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Separator />
        <SidebarTrigger className="cursor-pointer" />
      </SidebarFooter>
    </Sidebar>
  )
}