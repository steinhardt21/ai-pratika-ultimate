import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

const isOnboardingRoute = createRouteMatcher(['/onboarding'])
const isPublicRoute = createRouteMatcher(['/login', '/register', '/', '/workflows', '/manifesto', '/workflow/(.*)', '/resources', '/resources/(.*)', '/api/webhooks(.*)'])
const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth()

  const userRole = (sessionClaims?.metadata)?.role 


  // For users visiting /onboarding, don't try to redirect
  if (userId && isOnboardingRoute(req) && (sessionClaims?.metadata)?.onboardingComplete ) {
    return NextResponse.redirect(new URL('/', req.url))
  }


  // If the user isn't signed in and the route is private, redirect to sign-in
  if (!userId && !isPublicRoute(req)) return redirectToSignIn({ returnBackUrl: req.url })

  // Admin route protection - use Clerk's has() function for role-based access
  if (userId && isAdminRoute(req)) {
    // Check if user has admin role using Clerk's has() function

    if (userRole !== 'admin') {
      // Show proper 404 page to hide admin routes existence
      return NextResponse.rewrite(new URL('/not-found', req.url))
    }
    
    const response = NextResponse.next()
    response.headers.set('x-pathname', req.nextUrl.pathname)
    return response
  }

  // Catch users who do not have `onboardingComplete: true` in their publicMetadata
  // Redirect them to the /onboarding route to complete onboarding

  if (userId && !(sessionClaims?.metadata)?.onboardingComplete && !isAdminRoute(req)) {
    const onboardingUrl = new URL('/onboarding', req.url)
    return NextResponse.redirect(onboardingUrl)
  }

  // If the user is logged in and the route is protected, let them view.
  if (userId && !isPublicRoute(req)) return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}