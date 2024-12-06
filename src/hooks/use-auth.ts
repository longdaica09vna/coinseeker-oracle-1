import { apiService } from '@/services/api-service'
import { useAuthStoreContext } from '@/context/auth-context'

export const useAuth = () => {
  const { jwt, setNewAuth } = useAuthStoreContext()

  const login = async (jwt: string) => {
    const user = await apiService.user.getUserInfo(jwt)
    const newAuth = {
      user: user,
      role: user?.role?.name,
      profile: user?.profile,
      jwt,
    }
    setNewAuth(newAuth)
    return user
  }

  const checkUserLocal = async () => {
    const user = await apiService.user.getUserInfo(jwt ?? '')
    const newAuth = {
      user: user,
      role: user?.role?.name,
      profile: user?.profile,
      jwt: jwt,
    }
    setNewAuth(newAuth)
  }

  return {
    login,
    checkUserLocal,
  }
}
