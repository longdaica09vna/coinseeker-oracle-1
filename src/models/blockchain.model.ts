import type { ProjectModel } from './project.model'
import type { StrapiMediaModel } from './strapi-media.model'

export interface BlockchainModel {
  id?: number
  createdAt?: string
  updatedAt?: string
  chainName?: string
  shortName?: string
  uniqueName?: string
  key?: string
  projects?: ProjectModel[]
  topIndex?: string

  // relations
  blockchainIcon?: StrapiMediaModel
}
