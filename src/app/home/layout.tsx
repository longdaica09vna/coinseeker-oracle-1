'use client'
import Footer from './components/layout/footer'
import Header from './components/layout/header'
import { fetch3 } from '@/utils/fetcher3'

fetch3.$decrypt.subscribe((r) => {
  r.f(JSON.parse(r.x))
})

export default function SearchBetaLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header></Header>
          <div className="grow">{children}</div>
          <Footer></Footer>
        </div>
      </body>
    </html>
  )
}
