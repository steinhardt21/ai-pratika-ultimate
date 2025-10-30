
import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'

export default async function LoginPage() {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Welcome Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-aipratika-green dark:text-aipratika-cream mb-2">
              Bentornato!
            </h1>
            <p className="text-aipratika-green/70 dark:text-aipratika-cream/70">
              Accedi al tuo account per continuare con i tuoi workflow AI
            </p>
          </div>

          {/* Clerk Sign In Component */}
          <div className="flex justify-center">
            <SignIn
              signUpUrl="/register"
            />
          </div>

          {/* Additional Info */}
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