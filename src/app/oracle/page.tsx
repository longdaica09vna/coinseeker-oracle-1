'use client'

import BubbleMap from '@/components/oracle/bubble-map'
import { CoInvestorModel } from '@/models/co-investor.model'
import { apiService } from '@/services/api-service'
import React, { useEffect, useMemo, useState } from 'react'
import DEFAULT_AVATAR from '@/assets/images/default-avatar-new.png'

// const BubbleMap = dynamic(() => import('@/components/oracle/bubble-map'), { ssr: false })
export default function Oracle() {
  const [coInvestor, setCoInvestor] = useState(null as CoInvestorModel | null)
  const findBubbleMap = async () => {
    try {
      const res = await apiService.coInvestor.find({
        populate: ['subInvestors.logo', 'mainInvestor.logo'],
        filters: {
          id: 3827,
        },
      })
      setCoInvestor(res.data[0])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    findBubbleMap()
  }, [])

  const formatCoInvestor = useMemo(() => {
    const subInvestors = coInvestor?.subInvestors
    const mainInvestor = coInvestor?.mainInvestor
    const nodes =
      subInvestors?.map((item) => {
        return {
          id: item.id,
          group: 2,
          size: 116,
          img: item.logoLink ?? item.logo?.url ?? DEFAULT_AVATAR.src,
        }
      }) ?? []
    nodes.unshift({
      id: mainInvestor?.id,
      group: 1,
      size: 238,
      img: mainInvestor?.logoLink ?? mainInvestor?.logo?.url ?? DEFAULT_AVATAR.src,
    })
    const links = subInvestors?.map((item) => {
      const distance = Math.floor(Math.random() * (300 + 1) + 300)
      return {
        source: mainInvestor?.id,
        target: item.id,
        distance,
      }
    })
    return { nodes, links }
  }, [coInvestor])

  return (
    <div className="relative">
      <div className="absolute z-10 top-28 left-9">
        <div
          className="bg-[#121314] border border-[#121314] rounded-lg p-4 w-[342px]"
          style={{ boxShadow: '4px 4px 16px 0px #2B2B2B40' }}
        >
          <div className=" text-white text-2xl font-medium ">{coInvestor?.mainInvestor?.name}</div>
          <div className="mt-1 text-[#6B6B6B] text-sm">TIER 4</div>
          <div className="flex w-full mt-4">
            <div className="grow">
              <div className=" text-[#6B6B6B] text-sm">TOTAL VALUE</div>
              <div className=" text-white text-2xl font-medium ">--</div>
            </div>
            <div className="grow">
              <div className=" text-[#6B6B6B] text-sm">ROI</div>
              <div className=" text-white text-2xl font-medium ">--</div>
            </div>
          </div>
          <div className="mt-4 font-medium">
            <span className="text-[#6B6B6B] text-sm mr-1">FOCUS AREA:</span>
            <span className="text-sm">--</span>
          </div>
        </div>
        <div className="mt-4">
          <button className="bg-[#1278FA] w-full py-2 rounded-md">Expand</button>
        </div>
      </div>
      <BubbleMap nodes={formatCoInvestor.nodes} links={formatCoInvestor.links}></BubbleMap>
      <div className="absolute z-10 bottom-10 left-9">
        <div
          className="bg-[#121314] border border-[#121314] rounded-lg p-4 w-[342px]"
          style={{ boxShadow: '4px 4px 16px 0px #2B2B2B40' }}
        >
          <div className="flex justify-between items-end">
            <div className="text-white text-[16px] leading-5 font-medium">CONTACT LIST</div>
            <div className="text-xs font-medium">20 Credits</div>
          </div>

          <div className="mt-1 text-[#6B6B6B] text-xs">3 Selected</div>
          <div className="flex w-full mt-4"></div>
        </div>
        <div className="mt-4">
          <button className="bg-[#1278FA] w-full py-2 rounded-md">Connect</button>
        </div>
      </div>
    </div>
  )
}
