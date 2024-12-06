import { StrapiMediaModel } from './strapi-media.model'

export interface InvestorModel {
  id?: number
  createdAt?: string
  updatedAt?: string
  name?: string
  website?: string
  discord?: string
  facebook?: string
  telegram?: string
  twitter?: string
  email?: string
  slug?: string
  refUrl?: string
  logoLink?: string
  location?: string
  yearFounded?: string
  latestRoundAt?: string

  // relations
  logo?: StrapiMediaModel
}

export interface CoInvestorModel {
  id?: number
  subInvestorIds?: string
  mainInvestor?: InvestorModel
  subInvestors?: InvestorModel[]
}
