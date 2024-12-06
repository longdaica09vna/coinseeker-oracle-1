'use client'

import { PeopleModel } from '@/hooks/use-company-search'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import DEFAULT_AVATAR from '@/assets/images/default-avatar-new.png'

interface PropsModel {
  people: PeopleModel
}

const UserNameCell: React.FC<PropsModel> = ({ people }) => {
  const [imgSrc, setImgSrc] = useState('')

  useEffect(() => {
    setImgSrc(people.photo_url ?? '')
  }, [people])

  return (
    <div className="flex gap-2.5 items-center w-full px-3">
      <Image
        src={imgSrc ?? ''}
        alt=""
        width={40}
        height={40}
        className="rounded-full object-contain"
        onError={() => {
          setImgSrc(DEFAULT_AVATAR.src)
        }}
      ></Image>
      <div className="text-sm font-semibold break-words whitespace-nowrap"> {people.name}</div>
    </div>
  )
}

export default UserNameCell
