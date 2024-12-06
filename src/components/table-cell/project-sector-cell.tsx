'use client'
import React, { useMemo } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { SectorModel } from '@/models/sector.model'

interface ProjectSectorCellProps {
  sectors: SectorModel[]
  sectorType?: string
}

const ProjectSectorCellComponent: React.FC<ProjectSectorCellProps> = ({ sectors, sectorType }) => {
  const displaySectors = useMemo(
    () => sectors.filter((item: SectorModel) => item.type === sectorType),
    [sectorType, sectors],
  )

  const remainingSectors = useMemo(() => {
    if (displaySectors.length <= 1) {
      return []
    }
    return displaySectors.slice(1)
  }, [sectors, displaySectors])

  return (
    <div className="flex max-w-[152px] flex-wrap gap-x-1 gap-y-2 justify-end">
      {displaySectors.length <= 1 ? (
        displaySectors.map((sector) => (
          <div
            className={`rounded-md px-2 py-1 text-xs ${sector.type === 'Main' ? 'bg-[#141C2C] text-blue' : 'bg-dark1 text-dark3'}`}
            key={sector.id}
          >
            {sector.description ?? sector.sectorDescription}
          </div>
        ))
      ) : (
        <>
          <div
            className={`rounded-md px-2 py-1 text-xs ${displaySectors[0].type === 'Main' ? 'bg-[#141C2C] text-blue' : 'bg-dark1 text-dark3'}`}
          >
            {displaySectors[0].description ?? displaySectors[0].sectorDescription}
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex h-6 items-center text-center rounded-md bg-dark1 px-2 text-sm leading-[14px] text-dark3">
                  +{displaySectors.length - 1}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="max-w-[300px] p-4 text-white bg-[#090A0B]">
                  <h3 className="mb-2 text-start text-base font-semibold">All Sectors</h3>
                  <div className="flex flex-wrap gap-1">
                    {remainingSectors.map((sector) => (
                      <div
                        key={sector.id}
                        className={`w-fit rounded-md px-2 py-1 text-xs ${sector.type === 'Main' ? 'bg-[#141C2C] text-blue' : 'bg-dark1 text-dark3'}`}
                      >
                        {sector.description ?? sector.sectorDescription}
                      </div>
                    ))}
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      )}
    </div>
  )
}

export default ProjectSectorCellComponent
