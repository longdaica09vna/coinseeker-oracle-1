const twitterData = async (name: string) => {
  const url = `https://app.tweetscout.io/_next/data/CbC0lwiMKnexrG7OLNOfj/search.json?q=${name}`
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0',
    Cookie:
      'cf_clearance=KPpQ64MhxLuBrlE0Uvb9z7eb6PZcoRK2pI7sO6g9p90-1713498021-1.0.1.1-nr632V_Ri9FNTHgFF_8qrYCErpQIKpEuHMC8cLI5PxY3GOLYew_i8WfyXE0ksHVwAjUt_Uzpq7bAQux.WDa4tA',
    Referer: `https://app.tweetscout.io/search?q=${name}`,
  }
  return (await fetch(url, { method: 'GET', headers })).json()
}

export const twitterService = {
  twitterData,
}
