import { CompanySearch } from '@/hooks/use-company-search'
import { createContext, useContext } from 'react'

const CompanySearchContext = createContext<CompanySearch>({} as CompanySearch)

export function CompanySearchProvider({ children, vm }: { children: React.ReactNode } & { vm: CompanySearch }) {
  return <CompanySearchContext.Provider value={vm}>{children}</CompanySearchContext.Provider>
}

export function useCompanySearchContext() {
  return useContext(CompanySearchContext)
}
