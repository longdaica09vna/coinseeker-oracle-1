import type { AxiosInstance } from 'axios'
import { ApiRoute } from '../models/api-route'
import { stringify } from 'qs'

export const useUserHandler = (route: ApiRoute, axios: AxiosInstance) => {
  const getUserInfo = async (jwt: string) => {
    const params = stringify({
      populate: ['role', 'profile', 'profile.avatar'],
    })

    const res = await axios.get(`users/me?${params}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })

    return res.data
  }
  return {
    // base CRUD
    getUserInfo,
  }
}
