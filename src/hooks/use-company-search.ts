import { StrapiPagination } from '@/services/api-service/models/strapi-pagination'
import { companySearchService } from '@/services/company-search-service'
import { useState } from 'react'
import useDebounce from './use-debounce'
import { apiService } from '@/services/api-service'
import { useAuth } from './use-auth'
import { useAuthStoreContext } from '@/context/auth-context'
import { useToast } from './use-toast'

export interface CompanyModel {
  name?: string
  domain?: string
  website_url?: string
  logo_url?: string
  id?: string
}

export interface PeopleModel {
  id?: string
  firstName?: string
  lastName?: string
  name?: string
  email?: string
  title?: string
  photo_url?: string
}

export const useCompanySearch = () => {
  const [state, setState] = useState({
    companySearch: '',
    selectedCompany: null as null | CompanyModel,
    companies: [] as CompanyModel[],
    people: [] as PeopleModel[],
    loadingCompany: false,
    loadingPeople: false,
    loadingEmail: false,
    pagination: { page: 1 } as StrapiPagination,
    peopleId: null as null | string,
    stopSearch: false,
  })
  const auth = useAuth()
  const { jwt } = useAuthStoreContext()
  const { toast } = useToast()

  const getCompany = async () => {
    try {
      setState((prev) => ({ ...prev, loadingCompany: true }))
      const res = await companySearchService.getCompany(state.companySearch)
      setState((prev) => ({ ...prev, companies: res.organizations }))
    } catch {
      //
    } finally {
      setState((prev) => ({ ...prev, loadingCompany: false }))
    }
  }

  const getEmail = async () => {
    try {
      setState((prev) => ({
        ...prev,
        loadingEmail: true,
      }))
      const res = await companySearchService.getEmail(state.peopleId ?? '')
      await apiService.creditTransaction.useCredit('request-email', jwt ?? '')
      const email = res.contacts[0].email
      const people = state.people.map((item) => {
        if (item.id === state.peopleId) {
          return {
            ...item,
            email: email,
          }
        }
        return item
      })
      setState((prev) => ({ ...prev, people }))
      auth.checkUserLocal()
    } catch (e) {
      toast({
        variant: 'destructive',
        title: (e as any).toString(),
      })
    } finally {
      setState((prev) => ({
        ...prev,
        loadingEmail: false,
      }))
    }
  }

  const getPeople = async () => {
    try {
      setState((prev) => ({ ...prev, loadingPeople: true }))
      const res = await companySearchService.getPeople(state.selectedCompany?.id ?? '')
      setState((prev) => ({
        ...prev,
        people: res.people,
        pagination: {
          page: res.pagination.page,
          pageSize: res.pagination.per_page,
          pageCount: res.pagination.total_pages,
          total: res.pagination.total_entries,
        },
      }))
    } catch (error) {
      console.log(error)
    } finally {
      setState((prev) => ({ ...prev, loadingPeople: false }))
    }
  }

  const setLoadingCompany = (value: boolean) => {
    setState((prev) => ({ ...prev, loadingCompany: value }))
  }

  const setLoadingPeople = (value: boolean) => {
    setState((prev) => ({ ...prev, loadingPeople: value }))
  }

  const setLoadingEmail = (value: boolean) => {
    setState((prev) => ({ ...prev, loadingEmail: value }))
  }

  useDebounce(
    () => {
      getCompany()
    },
    [state.companySearch],
    2000,
    setLoadingCompany,
    state.stopSearch,
  )

  useDebounce(
    () => {
      getPeople()
    },
    [state.selectedCompany],
    2000,
    setLoadingPeople,
  )

  useDebounce(
    () => {
      getEmail()
    },
    [state.peopleId],
    5000,
    setLoadingEmail,
  )

  return {
    ...state,
    setState,
    getCompany,
    getEmail,
    getPeople,
  }
}

export type CompanySearch = ReturnType<typeof useCompanySearch>
