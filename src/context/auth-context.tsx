import { AuthStore } from '@/hooks/use-auth-store'
import { createContext, useContext } from 'react'

const AuthStoreContext = createContext<AuthStore>({} as AuthStore)

export function AuthStoreProvider({ children, store }: { children: React.ReactNode } & { store: AuthStore }) {
  return <AuthStoreContext.Provider value={store}>{children}</AuthStoreContext.Provider>
}

export function useAuthStoreContext() {
  return useContext(AuthStoreContext)
}
