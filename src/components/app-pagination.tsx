import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { StrapiPagination } from '@/services/api-service/models/strapi-pagination'
import { useMemo } from 'react'

interface Props extends React.ComponentProps<typeof Pagination> {
  pagination?: StrapiPagination
  max?: number
  setPage?: (page: number) => void
}

const AppPagination = ({ pagination, max = 5, setPage, ...props }: Props) => {
  const canGoFirstOrPrev = useMemo(() => (pagination?.page ?? 0) > 1, [pagination])
  const canGoLastOrNext = useMemo(() => (pagination?.page ?? 0) < (pagination?.pageCount ?? 0), [pagination])

  const displayedPages = useMemo(() => {
    if (!pagination) return []

    const r = Math.floor((Math.min(max, pagination.pageCount) - 5) / 2)
    const r1 = pagination.page - r
    const r2 = pagination.page + r

    const beforeWrapped = r1 - 1 > 1
    const afterWrapped = r2 + 1 < pagination.pageCount

    const items: Array<number | 'divider'> = []

    if (pagination.pageCount <= max) {
      for (let i = 1; i <= pagination.pageCount; i++) {
        items.push(i)
      }
      return items
    }

    items.push(1)

    if (beforeWrapped) items.push('divider')

    if (!afterWrapped) {
      const addedItems = pagination.page + r + 2 - pagination.pageCount
      for (let i = pagination.page - r - addedItems; i <= pagination.page - r - 1; i++) {
        items.push(i)
      }
    }

    for (let i = Math.max(2, r1); i <= Math.min(pagination.pageCount, r2); i++) {
      items.push(i)
    }

    if (!beforeWrapped) {
      const addedItems = 1 - (pagination.page - r - 2)
      for (let i = pagination.page + r + 1; i <= pagination.page + r + addedItems; i++) {
        items.push(i)
      }
    }

    if (afterWrapped) items.push('divider')

    if (r2 < pagination.pageCount) {
      items.push(pagination.pageCount)
    }

    // Replace divider by number on start edge case [1, '…', 3, ...]
    if (items.length >= 3 && items[1] === 'divider' && items[2] === 3) {
      items[1] = 2
    }

    // Replace divider by number on end edge case [..., 48, '…', 50]
    if (items.length >= 3 && items[items.length - 2] === 'divider' && items[items.length - 1] === items.length) {
      items[items.length - 2] = items.length - 1
    }

    return items
  }, [pagination])

  const handlePageClick = (page: number) => {
    setPage?.(page)
  }

  const handlePreviousClick = () => {
    if (!canGoFirstOrPrev) return
    setPage?.((pagination?.page ?? 0) - 1)
  }

  const handleNextClick = () => {
    if (!canGoLastOrNext) return
    setPage?.((pagination?.page ?? 0) + 1)
  }
  return (
    <Pagination {...props}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious showText={false} onClick={() => handlePreviousClick()} />
        </PaginationItem>
        {displayedPages.map((page, index) => {
          if (page === 'divider') {
            return (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          } else {
            return (
              <PaginationItem key={index} onClick={() => handlePageClick(page)}>
                <PaginationLink isActive={page === pagination?.page}>{page}</PaginationLink>
              </PaginationItem>
            )
          }
        })}
        <PaginationItem>
          <PaginationNext showText={false} onClick={() => handleNextClick()} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export { AppPagination }
