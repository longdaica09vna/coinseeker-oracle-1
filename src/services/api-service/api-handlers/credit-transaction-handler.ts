import type { AxiosInstance } from 'axios'
import { useBaseHandler } from './base-handler'
import { ApiRoute } from '../models/api-route'

export const useCreditTransactionHandler = (route: ApiRoute, axios: AxiosInstance) => {
  const useCredit = async (slug: string, jwt: string) => {
    const res = await axios.post(
      `${route}/spend-credit`,
      { slug },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    )
    return res.data
  }

  return {
    // base CRUD
    ...useBaseHandler<any>(route, axios),
    useCredit,
    // custom routes
  }
}
