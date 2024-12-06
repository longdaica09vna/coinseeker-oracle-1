'use client'

import { useAuthStoreContext } from '@/context/auth-context'
import { SearchSection } from './components/search'
import { TableUsers } from './components/table-users'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CompanySearchProvider } from '@/context/company-search-context'
import { useCompanySearch } from '@/hooks/use-company-search'
import { BASE_URL } from '../constant'
import { useAuth } from '@/hooks/use-auth'

export default function SearchBeta() {
  const { user } = useAuthStoreContext()
  const { checkUserLocal } = useAuth()
  const router = useRouter()
  const vm = useCompanySearch()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    checkRole()
  }, [])

  const checkRole = async () => {
    try {
      setLoading(true)
      await checkUserLocal()
      if (user) {
        if (user.tier !== 'diamond' && user.tier !== 'organisation') {
          router.push(BASE_URL + '/payment-info?plan=organisation')
        }
      } else {
        router.push(BASE_URL + '/payment-info?plan=organisation')
      }
    } catch {
      router.push(BASE_URL + '/payment-info?plan=organisation')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CompanySearchProvider vm={vm}>
      {loading ? (
        <></>
      ) : (
        <div className="flex md:flex-row flex-col gap-8 mt-[60px] md:mt-[80px]">
          <SearchSection></SearchSection>
          <TableUsers></TableUsers>
        </div>
      )}
    </CompanySearchProvider>
  )
}
