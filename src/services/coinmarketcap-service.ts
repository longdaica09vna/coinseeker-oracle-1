import { userAgent } from '@/app/constant'
import axios from 'axios'

const cryptoCurrencyDetail = async (id: unknown) => {
  const userSelect = userAgent[Math.floor(Math.random() * userAgent.length)]
  const url = `https://api.coinmarketcap.com/data-api/v3/cryptocurrency/detail?id=${id}`
  const headers = {
    'User-Agent': userSelect,
  }
  return (await fetch(url, { method: 'GET', headers })).json()
}

const cryptoQuotes = async (ids: string) => {
  const userSelect = userAgent[Math.floor(Math.random() * userAgent.length)]
  const url = `https://api.coinmarketcap.com/data-api/v3/cryptocurrency/quote/latest?id=${ids}`
  const headers = {
    'User-Agent': userSelect,
  }
  return (await fetch(url, { method: 'GET', headers })).json()
}

const cryptoQuotesV2 = async (ids: string) => {
  const userSelect = userAgent[Math.floor(Math.random() * userAgent.length)]
  const res = await axios.get(`https://api.coinmarketcap.com/data-api/v3/cryptocurrency/quote/latest?id=${ids}`, {
    headers: {
      'User-Agent': userSelect,
    },
  })
  return res.data
}

const chartCMCprice = async (id: string, rangeData: string) => {
  const userSelect = userAgent[Math.floor(Math.random() * userAgent.length)]
  const url = `https://api.coinmarketcap.com/data-api/v3/cryptocurrency/detail/chart?id=${id}&range=${rangeData}`
  const headers = {
    'User-Agent': userSelect,
  }
  return (await fetch(url, { method: 'GET', headers })).json()
}

const assets = async () => {
  const url = `https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing?start=1&limit=10000&sortType=desc&sortBy=date_added&&tagSlugs=internet-computer-ecosystem`
  return (await fetch(url, { method: 'GET' })).json()
}

export const coinMarketCapService = {
  cryptoCurrencyDetail,
  cryptoQuotes,
  cryptoQuotesV2,
  chartCMCprice,
  assets,
}
