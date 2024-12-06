import type { AxiosInstance } from 'axios'
import { useBaseHandler } from './base-handler'
import { ApiRoute } from '../models/api-route'

export const useCoInvestorHandler = (route: ApiRoute, axios: AxiosInstance) => {
  return {
    // base CRUD
    ...useBaseHandler<any>(route, axios),
    // custom routes
  }
}
