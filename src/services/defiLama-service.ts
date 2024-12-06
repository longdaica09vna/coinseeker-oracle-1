import { userAgent } from '@/app/constant'
const defiTVLchange = async () => {
  const userSelect = userAgent[Math.floor(Math.random() * userAgent.length)]
  const url = `https://api.llama.fi/lite/protocols2?b=2`
  const headers = {
    'User-Agent': userSelect,
  }
  return (await fetch(url, { method: 'GET', headers })).json()
}

const tvl = async (chain: string) => {
  const userSelect = userAgent[Math.floor(Math.random() * userAgent.length)]
  const url = `https://api.llama.fi/v2/historicalChainTvl/${chain}`
  const headers = {
    'User-Agent': userSelect,
  }
  return (await fetch(url, { method: 'GET', headers })).json()
}

const volume = async (name: string) => {
  const userSelect = userAgent[Math.floor(Math.random() * userAgent.length)]
  const url = ` https://api.llama.fi/overview/dexs/${name}?excludeTotalDataChart=false&excludeTotalDataChartBreakdown=true`
  const headers = {
    'User-Agent': userSelect,
  }
  return (await fetch(url, { method: 'GET', headers })).json()
}
export const defiLamaService = {
  defiTVLchange,
  tvl,
  volume,
}
