import { userAgent } from '@/app/constant'
const getCompany = async (search: string) => {
  const userSelect = userAgent[Math.floor(Math.random() * userAgent.length)]
  const url = `https://cyberk-lab.io.vn/api/email/get-company?text_search=${search}`
  const headers = {
    'User-Agent': userSelect,
  }
  return (await fetch(url, { method: 'GET', headers })).json()
}

const getPeople = async (id: string) => {
  const userSelect = userAgent[Math.floor(Math.random() * userAgent.length)]
  const url = `https://cyberk-lab.io.vn/api/email/get-people?company_id=${id}`
  const headers = {
    'User-Agent': userSelect,
  }
  return (await fetch(url, { method: 'GET', headers })).json()
}

const getEmail = async (id: string) => {
  const userSelect = userAgent[Math.floor(Math.random() * userAgent.length)]
  const url = `https://cyberk-lab.io.vn/api/email/get-email?people_id=${id}`
  const headers = {
    'User-Agent': userSelect,
  }
  return (await fetch(url, { method: 'GET', headers })).json()
}

export const companySearchService = {
  getCompany,
  getPeople,
  getEmail,
}
