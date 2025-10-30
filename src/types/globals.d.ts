import { Roles } from "@clerk/nextjs/server"

export {}

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean
      professioni?: string[]
      role?: Roles
    }
  }
}
