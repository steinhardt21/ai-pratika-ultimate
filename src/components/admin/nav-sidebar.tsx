'use client'

import { Icons } from "@/components/icons"
import Link from "next/link"
import { usePathname } from "next/navigation"
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

interface NavigationSidebarProps {
  items: SidebarNavItem[]
}

export function NavigationSidebar({ items }: NavigationSidebarProps) {
  const path = usePathname()

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
            >
                <span className="text-base font-semibold">APA</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
            {items.map((item, index) => {
            const Icon = Icons[item.icon as keyof typeof Icons] || "arrowRight"
            return (
              item.href && (

                <SidebarMenuItem key={index}>
                  <SidebarMenuButton disabled={item.disabled || false} asChild tooltip={item.title} isActive={path === item.href}>
                    <Link href={item.disabled ? "/" : item.href}>
                      <Icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
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