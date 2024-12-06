'use client'
import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useMemo } from 'react'
import { BlockchainModel } from '@/models/blockchain.model'
import Image from 'next/image'

interface ProjectBlockChainCellProps {
  blockchains: BlockchainModel[]
}

const ProjectBlockChainCellComponent: React.FC<ProjectBlockChainCellProps> = ({ blockchains }) => {
  const displayChains = useMemo(() => (blockchains?.length > 4 ? blockchains.slice(0, 3) : blockchains), [blockchains])

  const tooltipChains = useMemo(
    () => (blockchains ? blockchains.slice(3, blockchains.length) : blockchains),
    blockchains,
  )

  return (
    <div className="flex items-center justify-end">
      {displayChains.map((item) =>
        item.blockchainIcon?.url ? (
          <Image
            src={item.blockchainIcon?.url}
            key={item.id}
            className="-mr-2 h-6 w-6 rounded-full"
            alt={item.chainName ?? ''}
            width={24}
            height={24}
          />
        ) : (
          <div className="-mr-2 h-6 w-6 rounded-full bg-dark2 flex items-center justify-center" key={item.id}>
            {item.chainName?.charAt(0)}
          </div>
        ),
      )}
      {blockchains.length > 4 ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-full text-[10px] text-white">
                <span className="z-[3]"> +{blockchains.length - 3}</span>
                <div className="absolute z-[2] h-full w-full bg-[#202428] opacity-80"></div>
                {tooltipChains[0].blockchainIcon?.url ? (
                  <Image
                    className="absolute z-[1] h-6 w-6"
                    src={tooltipChains[0].blockchainIcon?.url || ''}
                    alt={tooltipChains[0].chainName ?? ''}
                    width={24}
                    height={24}
                  />
                ) : (
                  <div className="text-center">{tooltipChains[0].chainName?.charAt(0)}</div>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="h-full !w-fit z-10 bg-dark1 p-3">
                <div className="text-start text-sm font-semibold text-dark5">{blockchains.length - 3} chains</div>
                <div className="mt-3 grid grid-cols-3 gap-[10px]">
                  {tooltipChains.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 rounded-lg bg-dark2 p-2">
                      {item.blockchainIcon?.url ? (
                        <Image
                          className="h-6 w-6"
                          src={item.blockchainIcon?.url || ''}
                          alt={item.chainName ?? ''}
                          width={24}
                          height={24}
                        />
                      ) : (
                        <div className="h-6 w-6 rounded-full bg-gray-800 justify-center flex items-center">
                          {item.chainName?.charAt(0)}
                        </div>
                      )}

                      <div className="text-xs text-dark5">{item.chainName}</div>
                    </div>
                  ))}
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <></>
      )}
    </div>
  )
}

export default ProjectBlockChainCellComponent
