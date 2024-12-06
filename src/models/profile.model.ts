export type ProfileModel = {
  id?: number
  companyEmail?: string | null
  companyEmailConfirmed?: boolean
  avatar?: Image
  userName?: string | null
  company?: string | null
  position?: string | null
  website?: string | null
  discord?: string | null
  facebook?: string | null
  linkedin?: string | null
  telegram?: string | null
  twitter?: string | null
  email?: string | null
  username?: string
  updatedAt?: string
  createdAt?: string
}

export type ProfileUpdate = Omit<
  ProfileModel,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'companyEmail'
  | 'companyEmailConfirmed'
  | 'createdAt'
  | 'updatedAt'
  | 'username'
  | 'email'
  | 'avatar'
>

export type Image = {
  alternativeText: string | null
  caption: string | null
  createdAt: string
  ext: string
  folderPath: string
  hash: string
  height: number
  id: number
  mime: string
  name: string
  previewUrl: string | null
  provider: string
  provider_metadata: string | null
  size: number
  updatedAt: string
  url: string
  width: number
}
