'use client'
import UserEmailCell from '@/components/company-search/user-email-cell'
import UserNameCell from '@/components/company-search/user-name-cell'
import { Skeleton } from '@/components/ui/skeleton'
import { Table as AppTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useCompanySearchContext } from '@/context/company-search-context'

export const TableUsers: React.FC = () => {
  const { people, peopleId, pagination, setState, loadingEmail, loadingPeople } = useCompanySearchContext()

  // const setPage = (page: number) => {
  //   const newPagination = {
  //     ...pagination,
  //     page,
  //   }
  //   setState((prev) => ({ ...prev, pagination: newPagination }))
  // }

  const setPeopleId = (id: string) => {
    setState((prev) => ({ ...prev, peopleId: id }))
  }

  const loading = (id: string) => {
    return peopleId === id && loadingEmail
  }

  return (
    <div className="grow md:pr-6 md:mt-7 pb-8">
      <div className="font-bold text-xl md:text-2xl px-4 md:px-0">Tracking for</div>
      <div className="overflow-x-auto">
        <AppTable className="mt-4 md:mt-7 bg-dark0 pl-4 md:pl-0 rounded-lg">
          <TableHeader>
            <TableRow className="border-b-[0.5px] border-[#72787E26]">
              <TableHead className="font-semibold text-xs">
                <div className="px-3 whitespace-nowrap">User name</div>
              </TableHead>
              <TableHead className="font-semibold text-xs w-full">
                <div className="px-3">Title</div>
              </TableHead>
              <TableHead className="font-semibold text-xs">Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loadingPeople
              ? Array.from({ length: 10 }).map((_value, index) => (
                  <TableRow key={index} className=" border-b-[0.5px] border-[#72787E26]">
                    <TableCell>
                      <Skeleton className="h-[40px] bg-dark2"></Skeleton>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-[40px] bg-dark2 w-full"></Skeleton>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-[40px] bg-dark2 w-full"></Skeleton>
                    </TableCell>
                  </TableRow>
                ))
              : people.map((item, index) => (
                  <TableRow key={index} className=" border-b-[0.5px] border-[#72787E26]">
                    <TableCell>
                      <UserNameCell people={item}></UserNameCell>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm w-full px-3">{item.title}</div>
                    </TableCell>
                    <TableCell>
                      <UserEmailCell
                        people={item}
                        disabled={loadingEmail}
                        loading={loading(item.id ?? '')}
                        request={setPeopleId}
                      ></UserEmailCell>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </AppTable>
        {loadingPeople ? (
          <></>
        ) : pagination.pageCount ? (
          <></>
        ) : (
          <div className="w-full flex justify-center text-lg text-dark3 h-[200px] items-center">
            Please chose a company
          </div>
        )}
      </div>
    </div>
  )
}
