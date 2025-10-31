"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { MainNavItem } from "@/types"

interface MainNavButtonProps {
  item: MainNavItem
}

export function MainNavButton({ item }: MainNavButtonProps) {
  const router = useRouter()
  const pathname = usePathname()

  // Helper function to check if a nav item is active
  const isActive = (href: string) => {
    // Don't highlight anchor links (e.g., /#chi-siamo)
    if (href.includes('#')) {
      return false
    }
    // Exact match for home
    if (href === '/' && pathname === '/') return true
    // For other routes, check if pathname starts with href
    if (href !== '/') {
      return pathname === href || pathname.startsWith(href + '/')
    }
    return false
  }

  const scrollToElement = (targetId: string, maxAttempts = 20) => {
    let attempts = 0
    const tryScroll = () => {
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        return
      }
      
      attempts++
      if (attempts < maxAttempts) {
        setTimeout(tryScroll, 100)
      }
    }
    tryScroll()
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Play bubble sound on click
    // playClickSound()
    
    // Check if href contains an anchor
    if (href.includes('#')) {
      e.preventDefault()
      
      const [path, hash] = href.split('#')
      
      if (!hash) return
      
      // If we're navigating to a different page with an anchor
      if (path && typeof window !== 'undefined' && path !== window.location.pathname) {
        router.push(path)
        // Wait for navigation to complete, then scroll with retry logic
        setTimeout(() => {
          scrollToElement(hash)
        }, 200)
      } else {
        // Same page, just scroll to element
        scrollToElement(hash)
      }
    }
  }

  const active = isActive(item.href)

  return (
    <Link
      prefetch={true}
      href={item.disabled ? "#" : item.href}
      onClick={(e) => handleNavClick(e, item.href)}
      className={cn(
        "relative flex items-center px-3 py-2 text-sm font-medium cursor-pointer rounded-lg transition-all duration-200 group",
        active 
          ? "text-aipratika-violet" 
          : "text-aipratika-purple/70 hover:text-aipratika-purple",
        item.disabled && "cursor-not-allowed opacity-50"
      )}
    >
      {item.title}
      <span 
        className={cn(
          "absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-aipratika-violet to-aipratika-violet-light rounded-full transition-all duration-300",
          active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-50 group-hover:scale-x-100"
        )}
      /> 
    </Link>
  )
}

