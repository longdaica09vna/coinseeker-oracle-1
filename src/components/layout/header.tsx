import EXPLORE_MORE_ICON from '@/assets/icons/ecosystem/explore-more.svg'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu } from 'lucide-react'
import MOBILE_LOGO from '@/assets/images/ecosystem/mobile-logo.png'
import DESKTOP_LOGO_SRC from '@/assets/images/ecosystem/components.png'
import COINSEEKER_LOGO_LONG from '@/assets/images/coinseeker-logo-long.png'

export default function Header() {
  return (
    <div className="fixed z-50 box-border flex h-[60px] w-full flex-nowrap items-center border-b border-[#1B1D1F] bg-[#090A0B] px-4 lg:h-[80px] lg:px-9">
      <div className="flex h-[80px] w-full items-center">
        <div className="lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded border border-blue">
            <Menu className="h-8 w-8 text-blue" />
          </div>
        </div>
        <div className="ml-3 grow lg:hidden">
          <Link href="/projects" className="w-min cursor-pointer lg:hidden">
            <Image
              src={MOBILE_LOGO}
              alt="Source your next deal effortlessly - find all the upcoming blockchain companies in one place."
              width={116.06}
              height={36.56}
            />
          </Link>
        </div>
        <div className="hidden h-10 shrink-0 pt-2 lg:block">
          <Link href="/projects" className="cursor-pointer">
            <Image className="mr-6 w-[134.4px] h-6" src={DESKTOP_LOGO_SRC} alt="Internet Computer Logo" />
          </Link>
        </div>

        <div className="hidden lg:block">
          <Link
            href="/projects"
            className="flex h-[2.13rem] cursor-pointer items-center rounded-md border border-[#72787E26] bg-dark0 px-3"
          >
            <span className="mr-2 text-[10px] font-semibold text-[#72787E]">POWERED BY</span>
            <Image className="w-[87.75px] h-4" src={COINSEEKER_LOGO_LONG} alt="CoinSeeker Logo" />
          </Link>
        </div>
      </div>
      <div className="mr-3 hidden lg:block">
        <Link href={'https://coinseeker.co'} target="_blank">
          <div className="border rounded-lg select-none cursor-pointer border-blue gap-[7px] h-9 w-[140px] flex items-center justify-center text-blue text-sm font-semibold leading-[14px]">
            Explore more
            <Image src={EXPLORE_MORE_ICON} height={12} width={12} alt="Explore More Icon"></Image>
          </div>
        </Link>
      </div>
    </div>
  )
}
