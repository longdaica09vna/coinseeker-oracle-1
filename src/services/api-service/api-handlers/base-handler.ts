import { flatten } from '@/utils/strapi-helper'
import type { AxiosInstance } from 'axios'
import { StrapiParams } from '../models/strapi-params'
import { ApiRoute } from '../models/api-route'

const STRAPI_BASE_PARAMS: StrapiParams = {
  sort: ['createdAt:desc'],
  pagination: { page: 0, pageSize: 25 },
  populate: '*',
}

export const useBaseHandler = <T>(route: ApiRoute, axios: AxiosInstance) => {
  async function create(model: T, populate?: string[]): Promise<{ data: object[]; meta: object }> {
    const params = populate ? { populate } : { populate: '*' }
    const res = await axios.post(route, { data: model }, { params })
    return res.data
  }

  async function find(params: StrapiParams = {}): Promise<{
    data: T[]
    meta: {
      pagination: {
        page: number
        pageCount: number
        pageSize: number
        total: number
      }
    }
  }> {
    params = { ...STRAPI_BASE_PARAMS, ...params }
    const res = await axios.get(route, { params })
    return flatten(res)
  }

  async function findOne(id: number, populate: string[] | string = '*'): Promise<T> {
    const params = { populate }
    const res = await axios.get(`${route}/${id}`, { params })
    const data = flatten(res)
    return data.data
  }

  async function update(
    id: number,
    body: FormData,
    populate?: string[],
  ): Promise<{
    data: T
  }> {
    const params = populate ? { populate } : { populate: '*' }
    const res = await axios.put(`${route}/${id}`, body, { params })
    return flatten(res)
  }

  return { create, find, findOne, update }
}
