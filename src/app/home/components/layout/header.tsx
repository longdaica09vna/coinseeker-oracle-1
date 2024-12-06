import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import COINSEEKER_LOGO_LONG from '@/assets/images/coinseeker-logo-long.png'
import COINSEEKER_LOGO_MOBILE from '@/assets/images/coinseeker-logo-mobile.png'
import AvatarUser from './avatar-user'
import { BASE_URL } from '@/app/constant'

export default function Header() {
  return (
    <div className="fixed z-50 box-border flex h-[60px] w-full flex-nowrap items-center border-b border-[#1B1D1F] bg-[#090A0B] px-4 lg:h-[80px] lg:px-9">
      <div className="flex h-[80px] w-full items-center">
        <div className="lg:hidden">
          <Link href={BASE_URL} className="flex cursor-pointer items-center gap-3 ">
            <Image className="" src={COINSEEKER_LOGO_MOBILE} alt="CoinSeeker Logo" />
            <div className="bg-[#00204A] text-xs font-semibold text-[#58A1FF] px-2 py-1 rounded">Beta</div>
          </Link>
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <Link href={BASE_URL} className="flex cursor-pointer items-center ">
            <Image className="w-[145px] h-7" src={COINSEEKER_LOGO_LONG} alt="CoinSeeker Logo" />
          </Link>
          <div className="bg-[#00204A] text-sm font-semibold text-[#58A1FF] px-2 py-1 rounded">Beta</div>
        </div>
      </div>
      <div className="mr-3  text-white">{<AvatarUser></AvatarUser>}</div>
    </div>
  )
}
