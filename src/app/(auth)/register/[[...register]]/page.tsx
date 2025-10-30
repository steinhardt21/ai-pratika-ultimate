import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'
import { Suspense } from 'react'

function SignUpSkeleton() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-white dark:bg-aipratika-green-dark border border-aipratika-green/10 dark:border-aipratika-cream/10 shadow-lg rounded-lg p-8">
        <div className="space-y-6">
          test test test
          {/* Header skeleton */}
          <div className="text-center space-y-2">
            <div className="h-6 bg-aipratika-green/10 dark:bg-aipratika-cream/10 rounded animate-pulse"></div>
            <div className="h-4 bg-aipratika-green/10 dark:bg-aipratika-cream/10 rounded w-3/4 mx-auto animate-pulse"></div>
          </div>
          
          {/* Social buttons skeleton */}
          <div className="space-y-3">
            <div className="h-10 bg-aipratika-green/10 dark:bg-aipratika-cream/10 rounded animate-pulse"></div>
            <div className="h-10 bg-aipratika-green/10 dark:bg-aipratika-cream/10 rounded animate-pulse"></div>
          </div>
          
          {/* Divider skeleton */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 h-px bg-aipratika-green/10 dark:bg-aipratika-cream/10 animate-pulse"></div>
            <div className="h-4 w-8 bg-aipratika-green/10 dark:bg-aipratika-cream/10 rounded animate-pulse"></div>
            <div className="flex-1 h-px bg-aipratika-green/10 dark:bg-aipratika-cream/10 animate-pulse"></div>
          </div>
          
          {/* Form fields skeleton */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="h-4 w-20 bg-aipratika-green/10 dark:bg-aipratika-cream/10 rounded animate-pulse"></div>
              <div className="h-10 bg-aipratika-green/10 dark:bg-aipratika-cream/10 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-16 bg-aipratika-green/10 dark:bg-aipratika-cream/10 rounded animate-pulse"></div>
              <div className="h-10 bg-aipratika-green/10 dark:bg-aipratika-cream/10 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-aipratika-green/10 dark:bg-aipratika-cream/10 rounded animate-pulse"></div>
              <div className="h-10 bg-aipratika-green/10 dark:bg-aipratika-cream/10 rounded animate-pulse"></div>
            </div>
          </div>
          
          {/* Submit button skeleton */}
          <div className="h-10 bg-aipratika-orange/20 dark:bg-aipratika-orange-light/20 rounded animate-pulse"></div>
          
          {/* Footer skeleton */}
          <div className="text-center">
            <div className="h-4 bg-aipratika-green/10 dark:bg-aipratika-cream/10 rounded w-2/3 mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default async function RegisterPage() {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Welcome Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-aipratika-green dark:text-aipratika-cream mb-2">
              Unisciti a noi!
            </h1>
            <p className="text-aipratika-green/70 dark:text-aipratika-cream/70">
              Crea il tuo account e inizia a sfruttare i workflow AI
            </p>
          </div>

          {/* Clerk Sign Up Component with Suspense */}
          <div className="flex justify-center">
            <Suspense fallback={<SignUpSkeleton />}>
              <SignUp 
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "bg-white dark:bg-aipratika-green-dark border border-aipratika-green/10 dark:border-aipratika-cream/10 shadow-lg",
                    headerTitle: "text-aipratika-green dark:text-aipratika-cream",
                    headerSubtitle: "text-aipratika-green/70 dark:text-aipratika-cream/70",
                    socialButtonsBlockButton: "border border-aipratika-green/20 dark:border-aipratika-cream/20 hover:bg-aipratika-green/5 dark:hover:bg-aipratika-cream/5 text-aipratika-green dark:text-aipratika-cream",
                    socialButtonsBlockButtonText: "text-aipratika-green dark:text-aipratika-cream",
                    dividerLine: "bg-aipratika-green/20 dark:bg-aipratika-cream/20",
                    dividerText: "text-aipratika-green/60 dark:text-aipratika-cream/60",
                    formFieldLabel: "text-aipratika-green dark:text-aipratika-cream",
                    formFieldInput: "border-aipratika-green/20 dark:border-aipratika-cream/20 focus:border-aipratika-orange dark:focus:border-aipratika-orange-light text-aipratika-green dark:text-aipratika-cream bg-white dark:bg-aipratika-green-dark",
                    formButtonPrimary: "bg-aipratika-orange hover:bg-aipratika-orange-dark dark:bg-aipratika-orange-light dark:hover:bg-aipratika-orange text-white",
                    footerActionLink: "text-aipratika-orange dark:text-aipratika-orange-light hover:text-aipratika-orange-dark dark:hover:text-aipratika-orange",
                    footerActionText: "text-aipratika-green/70 dark:text-aipratika-cream/70",
                    identityPreviewText: "text-aipratika-green dark:text-aipratika-cream",
                    identityPreviewEditButton: "text-aipratika-orange dark:text-aipratika-orange-light",
                    formFieldErrorText: "text-red-500 dark:text-red-400",
                    formFieldSuccessText: "text-green-600 dark:text-green-400",
                    formFieldWarningText: "text-yellow-600 dark:text-yellow-400",
                    alertText: "text-aipratika-green dark:text-aipratika-cream",
                    formFieldInputShowPasswordButton: "text-aipratika-green/60 dark:text-aipratika-cream/60 hover:text-aipratika-orange dark:hover:text-aipratika-orange-light",
                    otpCodeFieldInput: "border-aipratika-green/20 dark:border-aipratika-cream/20 focus:border-aipratika-orange dark:focus:border-aipratika-orange-light text-aipratika-green dark:text-aipratika-cream bg-white dark:bg-aipratika-green-dark",
                    alternativeMethodsBlockButton: "border border-aipratika-green/20 dark:border-aipratika-cream/20 hover:bg-aipratika-green/5 dark:hover:bg-aipratika-cream/5 text-aipratika-green dark:text-aipratika-cream",
                  }
                }}
                redirectUrl="/workflows"
                signInUrl="/login"
              />
            </Suspense>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-aipratika-green/60 dark:text-aipratika-cream/60">
              Hai già un account?{' '}
              <Link 
                href="/login" 
                className="text-aipratika-orange dark:text-aipratika-orange-light hover:text-aipratika-orange-dark dark:hover:text-aipratika-orange font-medium transition-colors"
              >
                Accedi qui
              </Link>
            </p>
          </div>
        </div>
      </div>
  )
}