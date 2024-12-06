'use server'

const userAgent = [
  'Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
  'Mozilla/5.0 (Linux; U; Android 4.0.3; de-ch; HTC Sensation Build/IML74K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
  'Mozilla/5.0 (Linux; U; Android 2.3; en-us) AppleWebKit/999+ (KHTML, like Gecko) Safari/999.9',
  'Mozilla/5.0 (Linux; U; Android 2.3.5; zh-cn; HTC_IncredibleS_S710e Build/GRJ90) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
  'Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
  'Mozilla/5.0 (Linux; U; Android 2.3.4; fr-fr; HTC Desire Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
  'Mozilla/5.0 (Linux; U; Android 2.3.4; en-us; T-Mobile myTouch 3G Slide Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
  'Mozilla/5.0 (Linux; U; Android 2.3.3; zh-tw; HTC_Pyramid Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
  'Mozilla/5.0 (Linux; U; Android 2.3.3; zh-tw; HTC_Pyramid Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari',
  'Mozilla/5.0 (Linux; U; Android 2.3.3; zh-tw; HTC Pyramid Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
  'Mozilla/5.0 (Linux; U; Android 2.3.3; ko-kr; LG-LU3000 Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
  'Mozilla/5.0 (Linux; U; Android 2.3.3; en-us; HTC_DesireS_S510e Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
  'Mozilla/5.0 (Linux; U; Android 2.3.3; en-us; HTC_DesireS_S510e Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile',
  'Mozilla/5.0 (Linux; U; Android 2.3.3; de-de; HTC Desire Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
]

export const fetchFxempireData = async (id: unknown) => {
  const userSelect = userAgent[Math.floor(Math.random() * userAgent.length)]
  const url = `https://www.fxempire.com/api/v1/en/crypto-coin/chart?slug=${id}&from=7d&quote=usd`
  const headers = {
    'User-Agent': userSelect,
  }
  return (await fetch(url, { method: 'GET', headers })).json()
}

export const cryptoCurrencyDetail = async (id: unknown) => {
  const userSelect = userAgent[Math.floor(Math.random() * userAgent.length)]
  const url = `https://api.coinmarketcap.com/data-api/v3/cryptocurrency/detail?id=${id}`
  const headers = {
    'User-Agent': userSelect,
  }
  return (await fetch(url, { method: 'GET', headers })).json()
}

export const cryptoQuotes = async (ids: unknown) => {
  const userSelect = userAgent[Math.floor(Math.random() * userAgent.length)]
  const url = `https://api.coinmarketcap.com/data-api/v3/cryptocurrency/quote/latest?id=${ids}`
  const headers = {
    'User-Agent': userSelect,
  }
  return (await fetch(url, { method: 'GET', headers })).json()
}

export const chartCMCprice = async (id: string, rangeData: string) => {
  const userSelect = userAgent[Math.floor(Math.random() * userAgent.length)]
  const url = `https://api.coinmarketcap.com/data-api/v3/cryptocurrency/detail/chart?id=${id}&range=${rangeData}`
  const headers = {
    'User-Agent': userSelect,
  }
  return (await fetch(url, { method: 'GET', headers })).json()
}

export const defiTVLchange = async () => {
  const userSelect = userAgent[Math.floor(Math.random() * userAgent.length)]
  const url = `https://api.llama.fi/lite/protocols2?b=2`
  const headers = {
    'User-Agent': userSelect,
  }
  return (await fetch(url, { method: 'GET', headers })).json()
}

export const tvl = async (chain: string) => {
  const userSelect = userAgent[Math.floor(Math.random() * userAgent.length)]
  const url = `https://api.llama.fi/v2/historicalChainTvl/${chain}`
  const headers = {
    'User-Agent': userSelect,
  }
  return (await fetch(url, { method: 'GET', headers })).json()
}

export const volume = async (name: string) => {
  const userSelect = userAgent[Math.floor(Math.random() * userAgent.length)]
  const url = ` https://api.llama.fi/overview/dexs/${name}?excludeTotalDataChart=false&excludeTotalDataChartBreakdown=true`
  const headers = {
    'User-Agent': userSelect,
  }
  return (await fetch(url, { method: 'GET', headers })).json()
}

export const twitterData = async (name: string) => {
  const url = `https://app.tweetscout.io/_next/data/CbC0lwiMKnexrG7OLNOfj/search.json?q=${name}`
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0',
    Cookie:
      'cf_clearance=KPpQ64MhxLuBrlE0Uvb9z7eb6PZcoRK2pI7sO6g9p90-1713498021-1.0.1.1-nr632V_Ri9FNTHgFF_8qrYCErpQIKpEuHMC8cLI5PxY3GOLYew_i8WfyXE0ksHVwAjUt_Uzpq7bAQux.WDa4tA',
    Referer: `https://app.tweetscout.io/search?q=${name}`,
  }
  return (await fetch(url, { method: 'GET', headers })).json()
}
