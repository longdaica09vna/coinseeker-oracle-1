'use client'

import React, { useMemo, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useAuthStoreContext } from '@/context/auth-context'
import DEFAULT_AVATAR from '@/assets/images/default-avatar-new.png'
import Image from 'next/image'
import { formatNumber } from '@/utils/number.helpers'

export default function AvatarUser() {
  const [open, setOpen] = useState(false)
  const { profile, usernameProfile, user, credits } = useAuthStoreContext()

  const displayName = useMemo(() => {
    if (!usernameProfile) return ''
    if (usernameProfile?.length > 15) {
      return usernameProfile?.slice(0, 15) + '...'
    } else {
      return usernameProfile
    }
  }, [usernameProfile])

  const displayEmail = useMemo(() => {
    const email = user?.email
    if (email) {
      if (email.length > 15) {
        return usernameProfile?.slice(0, 15) + '...'
      } else {
        return email ?? ''
      }
    }
  }, [user])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Image
          src={profile?.avatar?.url ?? DEFAULT_AVATAR}
          alt={''}
          width={28}
          height={28}
          className="rounded-full h-7 w-7 object-cover"
        ></Image>
      </PopoverTrigger>
      <PopoverContent className="w-[368px] p-0 bg-dark1 border-none" align="start">
        <div className="flex items-center gap-4 p-4">
          <Image
            src={profile?.avatar?.url ?? DEFAULT_AVATAR}
            alt={''}
            width={40}
            height={40}
            className="rounded-full h-10 w-10 object-cover"
          ></Image>
          <div className="flex flex-col">
            <div className="font-semibold text-white">{displayName}</div>
            <div className="text-xs text-dark4">{displayEmail}</div>
          </div>
        </div>
        <div className="flex flex-col gap-2 bg-dark0 p-6">
          <div className="flex items-center p-4 text-[14px]">
            <div className="font-semibold text-dark4">
              Your Remaining Credits:
              <span className="font-semibold text-[#1278FA] ml-1">
                {formatNumber(credits, 0, 0) ?? 'Invalid Credits'}
              </span>
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                <path
                  fill="currentColor"
                  d="M224 22v63.46c-31.9 7.25-58.7 20.94-80.3 41.14c-33.7 31.5-50.53 74.7-50.53 129.6c0 54.3 16.53 97.3 49.63 129c21.9 20.9 49 35 81.2 42.1V492h64v-59.4c21.5-.6 42.3-3.2 62.7-7.9c23.5-5.3 56.3-13.2 78.2-23.9l-16-163.8H302l-36 58.8h69.6l8 66.2c-16.2 6.2-36.3 7.1-54.6 7.1c-33.5 0-59.4-9.8-77.7-29.5c-18.3-19.6-27.4-47.4-27.4-83.4c0-36.4 9.4-64.3 28.3-83.8c19-19.6 46-29.4 80.9-29.4c18.9 0 37.7 2.7 56.4 8c18.9 5.3 33.8 13.4 52.8 24.2l-8-72.5c-18.4-8.35-26-12.66-46.9-16.94c-18.9-3.94-38.7-6.06-59.4-6.38V22z"
                />
              </svg>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
