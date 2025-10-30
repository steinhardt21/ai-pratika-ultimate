import Link from "next/link";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SignedOut, SignedIn } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
import { MainNav } from "@/components/marketing/main-nav";
import { getNavigationItems } from "@/lib/navigation";
import { UserButton } from "@clerk/nextjs"
import { Skeleton } from "@/components/ui/skeleton";


export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const navigationItems = await getNavigationItems()

  return (
    <div className="flex min-h-screen flex-col bg-aipratika-cream">
      <header className="container px-8 md:px-16 lg:px-24 max-w-full backdrop-blur-sm sticky mx-auto top-0 z-50 bg-aipratika-cream/20">
        <div className="flex h-20 items-center justify-between py-6 border-b border-aipratika-green/5">
          <Link href="/" className="text-2xl font-bold text-aipratika-green cursor-pointer">AI Pratika</Link>
          <MainNav items={navigationItems} />
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
                <UserButton fallback={<Skeleton className="w-7 h-7 rounded-full" />} />
              </SignedIn>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}