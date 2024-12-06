import { BlockchainModel } from './blockchain.model'
import { ExMemberModel } from './ex-member.model'
import { InvestorModel } from './investor.model'
import { SectorModel } from './sector.model'
import { SmartFollowerModel } from './smart-follower.model'
import { StrapiMediaModel } from './strapi-media.model'
import { UserModel } from './user.model'

export interface ProjectModel {
  id?: number
  createdAt?: string
  updatedAt?: string
  name?: string
  valuationNumber?: string
  projectDescription?: string
  website?: string
  twitter?: string
  linkedIn?: string
  telegram?: string
  discord?: string
  facebook?: string
  status?: string
  dateDetected?: string
  twitterBio?: string
  valuationType?: string
  score?: number
  completenessScore?: number
  timingScore?: number
  capTableScore?: number
  execTeamScore?: number
  growthRateScore?: number
  email?: string
  twitterAvatar?: string
  type?: string
  viewCount?: number
  valuationUpdated?: boolean
  narrative?: string
  claimed?: boolean
  verified?: boolean
  input_source?: string
  attachment?: string
  slug?: string
  marketStatus?: boolean
  highlight?: boolean
  countryCode?: string
  dynamicLinks?: unknown[]
  valuation?: number
  at?: string
  roundId?: number
  viewedName?: string
  intervalId?: unknown
  publishedAt?: string
  fundRaised?: number
  smartFollowerCount?: number
  twitterFollowers?: unknown
  isFunded?: boolean

  // relations
  viewedBy?: unknown
  round?: unknown
  myLike?: unknown
  projectAvatar?: StrapiMediaModel
  blockchains?: BlockchainModel[]
  sectors?: SectorModel[]
  investors?: InvestorModel[]
  ex_members?: ExMemberModel[]
  editors?: UserModel[]
  documents?: unknown[]
  likedCount?: number | string
  twitter_detects?: unknown[]
  investor_lists?: unknown[]
  // project_details?: IOtherProjectDetailModel[]
  tokenName?: string
  tokenAddress?: string
  tokenId?: string
  cmcCoinId?: string
  okxChainId?: string
  price?: string
  marketCap?: string
  showDataSubscribed?: boolean
  smartFollowers?: SmartFollowerModel[]
  defiLamaId?: string
  coingeckoCoinId?: string
  fxempireSlug?: string
}
