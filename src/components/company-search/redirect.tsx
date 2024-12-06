'use client'
import { useAuth } from '@/hooks/use-auth'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BASE_URL } from '@/app/constant'

export default function CompanySearchCallback() {
  const { login } = useAuth()
  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    checkDiamondTier()
  }, [])

  const checkDiamondTier = async () => {
    try {
      const jwt = params.get('jwt')
      if (jwt) {
        const res = await login(jwt)
        if (res?.tier !== 'diamond' && res?.tier !== 'organisation') {
          router.push(BASE_URL + '/payment-info?plan=organisation')
        } else {
          router.push('/home')
        }
      } else {
        router.push(BASE_URL + '/payment-info?plan=organisation')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return <div className="grow mt-[90px] px-9">Waiting for redirecting to email finder...</div>
}
