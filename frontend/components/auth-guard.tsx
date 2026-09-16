'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, type UserProfile } from '@/components/auth-provider'

export function AuthGuard({
  children,
}: {
  children: (profile: UserProfile) => React.ReactNode
}) {
  const router = useRouter()
  const { user, profile, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login')
    }
  }, [loading, user, router])

  // No loading screen: render nothing until the session is ready, then the
  // page appears instantly.
  if (loading || !user || !profile) {
    return null
  }

  return <>{children(profile)}</>
}
