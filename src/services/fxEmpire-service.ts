import { userAgent } from '@/app/constant'

const fetchFxempireData = async (id: unknown) => {
  const userSelect = userAgent[Math.floor(Math.random() * userAgent.length)]
  const url = `https://www.fxempire.com/api/v1/en/crypto-coin/chart?slug=${id}&from=7d&quote=usd`
  const headers = {
    'User-Agent': userSelect,
  }
  return (await fetch(url, { method: 'GET', headers })).json()
}

export const fxEmpireService = {
  fetchFxempireData,
}
