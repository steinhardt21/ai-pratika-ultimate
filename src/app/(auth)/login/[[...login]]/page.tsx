
import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'

export default async function LoginPage() {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-aipratika-green dark:text-aipratika-cream mb-2">
              Bentornato!
            </h1>
            <p className="text-aipratika-green/70 dark:text-aipratika-cream/70">
              Accedi al tuo account per continuare con i tuoi workflow AI
            </p>
          </div>

          <div className="flex justify-center">
            <SignIn
              fallback={<LoginSkeleton />}
              signUpUrl="/register"
            />
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-aipratika-green/60 dark:text-aipratika-cream/60">
              Non hai ancora un account?{' '}
              <Link 
                href="/register" 
                className="text-aipratika-orange dark:text-aipratika-orange-light hover:text-aipratika-orange-dark dark:hover:text-aipratika-orange font-medium transition-colors"
              >
                Registrati gratuitamente
              </Link>
            </p>
          </div>
        </div>
      </div>
  )
}

function LoginSkeleton() {
  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 space-y-6"> 
      {/* Header */}
      <div className="text-center space-y-2">
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
      </div>

      {/* Social Buttons */}
      <div className="flex gap-3 justify-center">
        <Skeleton className="h-12 w-12 rounded-md" />
        <Skeleton className="h-12 w-12 rounded-md" />
        <Skeleton className="h-12 w-12 rounded-md" />
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-px flex-1" />
        <Skeleton className="h-4 w-8" />
        <Skeleton className="h-px flex-1" />
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Email Field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Continue Button */}
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  )
}