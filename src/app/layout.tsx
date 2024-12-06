'use client'
import './globals.css'
import dynamic from 'next/dynamic'
import { AuthStoreProvider } from '@/context/auth-context'
import { useAuthStore } from '@/hooks/use-auth-store'
import { Toaster } from '@/components/ui/toaster'

const QueryProvider = dynamic(() => import('@/components/query-provider'), {
  ssr: false,
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const store = useAuthStore()
  return (
    <html lang="en">
      <body className="antialiased">
        <QueryProvider>
          <AuthStoreProvider store={store}>
            <div>{children}</div>
            <Toaster />
          </AuthStoreProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
