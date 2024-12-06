export interface SectorModel {
  id?: number
  createdAt?: string
  updatedAt?: string
  description?: string
  uniqueName?: string
  type?: SectorType
  sectorDescription?: string
  selected: boolean

  // relations
  subSectors?: SectorModel[]
}

export type SectorType = 'Main' | 'Sub'
