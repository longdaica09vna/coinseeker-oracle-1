import { ProfileModel } from '@/models/profile.model'
import { UserModel } from '@/models/user.model'
import { useState, useMemo, useEffect } from 'react'

interface AuthState {
  jwt?: string | null
  refreshToken?: string | null
  user?: UserModel | null
  profile?: ProfileModel | null
  role?: 'Pro' | 'Authenticated' | 'Editor' | 'Research' | 'SuperEditor' | 'Syndicate' | 'SyndicatePro' | null
}
export const useAuthStore = () => {
  const [auth, setAuth] = useState({
    jwt: null,
    refreshToken: null,
    user: null,
    profile: null,
    role: null,
  } as AuthState)

  const isLogin = useMemo(() => auth.jwt, [auth])

  const isDiamond = useMemo(() => auth.user?.tier === 'diamond', [auth])

  const credits = useMemo(() => auth.user?.credits ?? 0, [auth])

  const usernameProfile = useMemo(() => auth.profile?.username || auth.user?.username, [auth])

  useEffect(() => {
    const auth = localStorage.getItem('auth')
    if (auth) {
      const parse = JSON.parse(auth)
      setAuth((prev) => ({ ...prev, ...parse }))
    }
  }, [])

  const setNewAuth = (newAuth: AuthState) => {
    setAuth((prev) => ({ ...prev, ...newAuth }))
    localStorage.setItem('auth', JSON.stringify({ ...auth, ...newAuth }))
  }

  return {
    ...auth,
    setNewAuth,
    isLogin,
    isDiamond,
    usernameProfile,
    credits,
  }
}

export type AuthStore = ReturnType<typeof useAuthStore>
