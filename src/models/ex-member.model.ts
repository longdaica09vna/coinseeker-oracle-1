import type { StrapiMediaModel } from './strapi-media.model'

export interface ExMemberModel {
  id?: number
  createdAt?: string
  updatedAt?: string
  name?: string
  linkedin?: string
  twitter?: string
  telegram?: string
  discord?: string
  facebook?: string
  description?: string
  role?: string
  calendly?: string
  email?: string
  twitterAvatar?: string

  // relations
  avatar?: StrapiMediaModel
}
