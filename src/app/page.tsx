'use client'

import { fetch3 } from '@/utils/fetcher3'

import Footer from './home/components/layout/footer'
import CompanySearchCallback from '@/components/company-search/redirect'
import Header from './home/components/layout/header'

fetch3.$decrypt.subscribe((r) => {
  r.f(JSON.parse(r.x))
})

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header></Header>
      <CompanySearchCallback></CompanySearchCallback>
      <Footer></Footer>
    </div>
  )
}