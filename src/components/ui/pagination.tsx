import * as React from 'react'
import { MoreHorizontal } from 'lucide-react'

import { cn } from '@/lib/utils'
import { ButtonProps, buttonVariants } from '@/components/ui/button'
import { DefaultPaginationNextIcon, DefaultPaginationPreviousIcon } from '../icons/default-pagination-previous-icons'

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
)
Pagination.displayName = 'Pagination'

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn('flex flex-row items-center gap-2', className)} {...props} />
  ),
)
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
))
PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'a'>

const PaginationLink = ({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: 'ghost',
        size,
      }),
      {
        'bg-[#0472FF1A] text-[#0472FF]': isActive,
        '': !isActive,
      },
      'h-8 select-none cursor-pointer px-2 min-w-10 rounded flex items-center font-bold text-sm',
      className,
    )}
    {...props}
  />
)
PaginationLink.displayName = 'PaginationLink'

const PaginationPrevious = ({
  className,
  showText = true,
  icon,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { showText?: boolean; icon?: React.ReactNode }) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn('*:fill-[#72787E] *:hover:fill-white', className)}
    {...props}
  >
    {icon ? icon : <DefaultPaginationPreviousIcon />}
    {showText && <span>Previous</span>}
  </PaginationLink>
)
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = ({
  className,
  showText = true,
  icon,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { showText?: boolean; icon?: React.ReactNode }) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn('*:fill-[#72787E] *:hover:fill-white', className)}
    {...props}
  >
    {showText && <span>Next</span>}
    {icon ? icon : <DefaultPaginationNextIcon />}
  </PaginationLink>
)
PaginationNext.displayName = 'PaginationNext'

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span aria-hidden className={cn('flex h-9 w-9 items-center select-none justify-center', className)} {...props}>
    <div className="font-semibold">...</div>
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = 'PaginationEllipsis'

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
