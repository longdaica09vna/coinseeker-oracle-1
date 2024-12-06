import type { AxiosInstance } from 'axios'
import { useBaseHandler } from './base-handler'
import { ApiRoute } from '../models/api-route'
import { SectorModel } from '@/models/sector.model'

export const useSectorHandler = (route: ApiRoute, axios: AxiosInstance) => {
  return {
    // base CRUD
    ...useBaseHandler<SectorModel>(route, axios),
  }
}
