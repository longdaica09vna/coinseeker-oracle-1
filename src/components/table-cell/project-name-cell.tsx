'use client'
import React, { useMemo, useState } from 'react'
import { ProjectModel } from '@/models/project.model'
import Image from 'next/image'

interface ProjectNameCellProps {
  project: ProjectModel
}

const ProjectNameCellComponent: React.FC<ProjectNameCellProps> = ({ project }) => {
  const [isErrored, setError] = useState(false)

  const logo = useMemo(() => {
    if (project.projectAvatar) return project?.projectAvatar.url
    if (project.twitterAvatar) return project?.twitterAvatar
    return process.env.VUE_APP_CDN_V2 + `/projects/${project.slug}.png`
  }, [project])
  const name = useMemo(() => project.name ?? '--', [project])
  const tokenId = useMemo(() => project.tokenId, [project])
  const isVerified = useMemo(() => project.verified || project.claimed, [project])

  const generateColor = useMemo(() => {
    const str = name.substring(0, 2)
    let hash = 0
    for (let i = 0; i < str?.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    let color = '#'
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff
      color += ('00' + value.toString(16)).substr(-2)
    }
    return `${color.toLocaleUpperCase()}`
  }, [name])

  const onError = (): void => {
    setError(true)
  }

  return (
    <div className="flex max-w-[100px] items-center gap-2 *:shrink-0 lg:max-w-[260px]">
      {isErrored ? (
        <div
          className="flex h-5 w-5 items-center justify-center rounded-full text-xs text-white"
          style={{ background: `${generateColor}` }}
        >
          {name.slice(0, 2)}
        </div>
      ) : (
        <Image
          src={logo ?? ''}
          className="h-5 w-5 rounded-full border border-dark2 object-contain"
          onError={onError}
          alt={name}
          width={20}
          height={20}
        />
      )}
      <div className="!shrink overflow-hidden text-ellipsis text-nowrap text-sm font-semibold leading-[21px] text-dark5">
        {name}
      </div>
      {tokenId ? <div className="text-sm leading-[21px] text-dark3">{tokenId}</div> : <></>}
      {isVerified ? (
        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_11447_21156)">
            <path
              d="M13.4058 10.6081C15.398 9.75466 15.3981 6.77883 13.406 5.92531C14.2528 3.89179 12.1084 1.74739 10.0749 2.59424C9.2214 0.601929 6.24557 0.602162 5.3919 2.59426C3.3584 1.74738 1.21395 3.89172 2.06087 5.92526C0.0684568 6.77873 0.0686902 9.7547 2.0609 10.6083C1.21394 12.6418 3.3583 14.7862 5.39181 13.9393C6.24528 15.9318 9.22127 15.9315 10.0749 13.9393C12.1084 14.7862 14.2523 12.6415 13.4058 10.6081ZM7.31916 9.50634L7.31916 9.50635L6.84276 9.98275L6.36641 9.50641L6.36635 9.50635L5.3147 8.45434L5.4376 8.33144L6.4892 9.38303L6.84272 9.73655L7.19628 9.38307L10.0292 6.55063L10.1521 6.6735L7.31916 9.50634Z"
              stroke="#0472ff"
            />
          </g>
          <defs>
            <clipPath id="clip0_11447_21156">
              <rect width="16" height="16" fill="#0472ff" />
            </clipPath>
          </defs>
        </svg>
      ) : (
        <></>
      )}
    </div>
  )
}

export default ProjectNameCellComponent
