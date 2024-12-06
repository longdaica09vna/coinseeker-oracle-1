'use client'

import { fetch3 } from '@/utils/fetcher3'

import Footer from './home/components/layout/footer'
import Header from './home/components/layout/header'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

fetch3.$decrypt.subscribe((r) => {
  r.f(JSON.parse(r.x))
})

export default function Page() {
  const router = useRouter()
  useEffect(() => {
    router.push('/oracle')
  }, [])
  return (
    <div className="flex min-h-screen flex-col">
      <Header></Header>
      <Footer></Footer>
    </div>
  )
}
