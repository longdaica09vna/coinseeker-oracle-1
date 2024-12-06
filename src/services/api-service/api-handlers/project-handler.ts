import type { AxiosInstance } from 'axios'
import { useBaseHandler } from './base-handler'
import { ProjectModel } from '@/models/project.model'
import { ApiRoute } from '../models/api-route'
import { StrapiParams } from '../models/strapi-params'
import { stringify } from 'qs'

export const useProjectHandler = (route: ApiRoute, axios: AxiosInstance) => {
  const fetch = async (params: StrapiParams = {}, myLike = true) => {
    console.log('hehe.useProjectHandler.env', process.env.NEXT_PUBLIC_COINSEEKER_API_URL)
    console.log('hehe.useProjectHandler.params', params)
    console.log('hehe.useProjectHandler.stringifiedParams', stringify(params))

    const res = await axios.get(`${route}/fetch2?myLike=${myLike}&${stringify(params)}`)
    console.log('hehe.useProjectHandler.res', res)

    return res.data
  }

  const fetchTwitterStatistics = async (slug: string, days: number) => {
    const res = await axios.get(`${route}/twitter-statistics?slug=${slug}&days=${days}`)
    return res
  }

  const getCounters = async (filters = {}) => {
    const res = await axios.get(`${route}/counters?${stringify(filters)}`)
    return res
  }

  return {
    // base CRUD
    ...useBaseHandler<ProjectModel>(route, axios),

    // custom routes
    fetch,
    fetchTwitterStatistics,
    getCounters,
  }
}
