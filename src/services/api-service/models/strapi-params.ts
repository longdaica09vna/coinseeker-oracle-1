export interface StrapiParams {
  filters?: object
  sort?: string[]
  pagination?: StrapiPaginationParams
  populate?: string[] | string
  publicationState?: string
  fields?: string[]
}

export type StrapiPaginationParams = { page?: number; pageSize?: number; start?: number; limit?: number }
