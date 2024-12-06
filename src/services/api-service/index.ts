import Axios from 'axios'
import { stringify } from 'querystring'
import { useProjectHandler } from './api-handlers/project-handler'
import { pb } from '@/utils/pb'
import { useSectorHandler } from './api-handlers/sector-handler'
import { useUserHandler } from './api-handlers/user-handler'
import { useCreditTransactionHandler } from './api-handlers/credit-transaction-handler'
import { useCoInvestorHandler } from './api-handlers/co-investor-handler'

const axios = Axios.create({ baseURL: `${process.env.NEXT_PUBLIC_COINSEEKER_API_URL}/api` })

axios.interceptors.request.use((config) => {
  //   const { jwt } = useAuthStore()
  //   if (jwt) {
  //     config.headers = {
  //       ...(config.headers || {}),
  //       Authorization: `Bearer ${jwt}`,
  //     } as AxiosRequestHeaders
  //   }
  config.paramsSerializer = (params) => stringify(params)
  return config
})

axios.interceptors.response.use(async (response) => {
  if (response?.data) response.data = await parse(response.data)
  return response
})

const project = useProjectHandler('projects', axios)
const sector = useSectorHandler('sectors', axios)
const user = useUserHandler('users', axios)
const creditTransaction = useCreditTransactionHandler('credit-transactions', axios)
const coInvestor = useCoInvestorHandler('co-investors', axios)

const parse = (data: string) => {
  return pb.push(data) as Promise<unknown>
}

export const apiService = {
  project,
  sector,
  user,
  creditTransaction,
  coInvestor,
}
