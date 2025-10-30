'use client'

import { UserButton } from "@clerk/nextjs"
import { useEffect, useState } from "react"

export function UserButtonWrapper() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return <UserButton />
}
