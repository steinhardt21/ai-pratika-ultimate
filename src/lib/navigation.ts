import { auth } from '@clerk/nextjs/server'
import { marketingConfig } from '@/config/marketing'
import type { MainNavItem } from '@/types'

/**
 * Get navigation items with Dashboard and Admin links added for authenticated users
 */
export async function getNavigationItems(): Promise<MainNavItem[]> {
  const { userId, sessionClaims } = await auth()
  const userRole = sessionClaims?.metadata?.role

  // Base navigation items
  const baseItems = marketingConfig.mainNav
  
  // Only add Dashboard if user is signed in and has completed onboarding
  const hasCompletedOnboarding = sessionClaims?.metadata?.onboardingComplete
  
  if (userId && hasCompletedOnboarding) {
    const navItems: MainNavItem[] = [
      {
        title: "Dashboard",
        href: "/dashboard",
      }
    ]
    
    // Check if user has admin role using Clerk's has() function
    const isAdmin = userRole === 'admin'
    
    console.log('Navigation - admin check result:', isAdmin)
    
    if (isAdmin) {
      console.log('Adding Admin link to navigation')
      navItems.push({
        title: "Admin",
        href: "/admin",
      })
    }
    
    return [
      ...navItems,
      ...baseItems
    ]
  }
  
  return baseItems
}
