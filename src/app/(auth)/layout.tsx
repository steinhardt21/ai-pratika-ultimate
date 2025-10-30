import Link from "next/link"
import { SignedIn, SignedOut } from "@clerk/nextjs"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
// import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/marketing/site-footer"
import { BorderBeam } from "@/components/ui/border-beam"
import { UserButtonWrapper } from "@/components/user-button-wrapper"
// import { getNavigationItems } from "@/lib/navigation"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default async function AuthLayout({
  children,
}: AuthLayoutProps) {
  // const navigationItems = await getNavigationItems()
  
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="container mx-auto z-40 bg-aipratika-cream">
        <div className="flex h-20 items-center justify-between py-6 border-b border-aipratika-green/5">
          {/* <MainNav items={navigationItems} /> */}
          <nav>
            <SignedOut>
              <Link
                prefetch
                href="/login"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "px-4 relative overflow-hidden"
                )}
              >
                Login
                <BorderBeam
                  size={40}
                  initialOffset={20}
                  className="from-transparent via-yellow-500 to-transparent"
                  transition={{
                    type: "spring",
                    stiffness: 60,
                    damping: 20,
                  }}
                />
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButtonWrapper />
            </SignedIn>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
