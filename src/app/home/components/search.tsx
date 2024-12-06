'use client'
import Image from 'next/image'
import { Link, Loader2, Search } from 'lucide-react'
import { useCompanySearchContext } from '@/context/company-search-context'
import LiveSearch from '@/components/company-search/search-input'
import { CompanyModel } from '@/hooks/use-company-search'
import CompanySearchImage from '@/assets/images/start-search-company.png'

export const SearchSection: React.FC = () => {
  const { companies, selectedCompany, companySearch, setState, loadingCompany } = useCompanySearchContext()

  const selectCompany = (company: CompanyModel) => {
    setState((prev) => ({ ...prev, selectedCompany: company, companySearch: company.name ?? '', stopSearch: true }))
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, companySearch: event.target.value, stopSearch: false }))
  }

  type changeHandler = React.ChangeEventHandler<HTMLInputElement>

  const openNewLink = (e: any, link: string) => {
    e.stopPropagation()
    window.open('https://' + link, '_blank')
  }

  const handleChange: changeHandler = (e) => {
    const { target } = e
    setState((prev) => ({ ...prev, companySearch: target.value, stopSearch: false }))
  }

  return (
    <div className="w-full md:w-[280px] md:min-h-screen bg-dark0">
      <div className="relative hidden md:block">
        <Search className="pointer-events-none w-4 h-4 absolute top-1/2 transform -translate-y-1/2 left-3 text-dark3"></Search>
        {loadingCompany ? <Loader2 className="animate-spin w-4 h-4 absolute top-[16px] right-3 text-dark5" /> : <></>}
        <input
          placeholder="Search name"
          className="border border-gray-900 py-3 px-4 bg-dark0 placeholder:text-dark3 text-dark5 appearance-none w-full block pl-9 focus:outline-none"
          onChange={handleInputChange}
          value={companySearch}
        />
      </div>
      <div className="relative md:hidden">
        <LiveSearch
          renderItem={(item: CompanyModel) => (
            <div className="py-3 px-6 flex gap-3 items-center hover:bg-[#1B1D1F] cursor-pointer">
              <Image src={item.logo_url ?? ''} alt="" width={40} height={40} className="rounded-full"></Image>
              <div className="flex flex-col gap-2">
                <div className="text-sm font-semibold">{item.name}</div>
                <div className="text-sm flex items-center gap-2">
                  {item.domain}
                  <Link className="cursor-pointer h-4 w-4 text-[#72787E]"></Link>
                </div>
              </div>
            </div>
          )}
          results={companies}
          onChange={handleChange}
          onSelect={(item) => selectCompany(item)}
          value={selectedCompany}
          searchInput={companySearch}
        ></LiveSearch>
        {loadingCompany ? <Loader2 className="animate-spin w-4 h-4 absolute top-[16px] right-3 text-dark5" /> : <></>}
      </div>
      <div className="border-t border-dark1 py-2.5 hidden md:block">
        {companies.length === 0 ? (
          <div className="flex flex-col gap-4 items-center mt-12">
            <Image src={CompanySearchImage} alt={''} height={156} className="w-[200px]"></Image>
            <div className="text-sm text-dark4">Start by searching a company</div>
          </div>
        ) : (
          <></>
        )}
        <div className="flex flex-col">
          {companies?.map((item) => (
            <div
              key={item.id}
              className="py-3 px-6 flex gap-3 items-center hover:bg-[#1B1D1F] cursor-pointer"
              onClick={() => {
                selectCompany(item)
              }}
            >
              <Image src={item.logo_url ?? ''} alt="" width={40} height={40} className="rounded-full"></Image>
              <div className="flex flex-col gap-2">
                <div className="text-sm font-semibold ">{item.name}</div>
                <div className="text-sm flex items-center gap-2">
                  <div className="truncate max-w-[150px]">{item.domain}</div>
                  <Link
                    className="cursor-pointer h-4 w-4 text-[#72787E]"
                    onClick={(e) => {
                      openNewLink(e, item.domain ?? '')
                    }}
                  ></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
