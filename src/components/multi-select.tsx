'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, SearchIcon } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

type Option = { label: string; value: string }

interface ISelectProps {
  placeholder: string
  options: Option[]
  selectedOptions: string[]
  setSelectedOptions: Dispatch<SetStateAction<string[]>>
  buttonClassName: string
  className: string
  selectAll?: boolean
  searchBar?: boolean
}
const MultiSelect = ({
  placeholder,
  options: options,
  selectedOptions: selectedItems,
  setSelectedOptions: setSelectedItems,
  buttonClassName,
  className: dropdownClassName,
  selectAll = false,
  searchBar = false,
}: ISelectProps) => {
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options) // State for filtered options

  const handleSelectChange = (value: string) => {
    if (!selectedItems.includes(value)) {
      setSelectedItems((prev) => [...prev, value])
    } else {
      const referencedArray = [...selectedItems]
      const indexOfItemToBeRemoved = referencedArray.indexOf(value)
      referencedArray.splice(indexOfItemToBeRemoved, 1)
      setSelectedItems(referencedArray)
    }
  }

  const isOptionSelected = (value: string): boolean => {
    return selectedItems.includes(value) ? true : false
  }
  const handleSelectAllChange = () => {
    if (selectedItems.length === options.length) {
      setSelectedItems([]) // Deselect all
    } else {
      setSelectedItems(options.map((option) => option.value)) // Select all
    }
  }

  function SearchByText(input: string): void {
    setFilteredOptions(options.filter((option) => option.label.toLowerCase().includes(input.toLowerCase())))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-full">
        <Button variant="outline" className={buttonClassName}>
          <div>{placeholder}</div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={dropdownClassName} onCloseAutoFocus={(e) => e.preventDefault()}>
        {searchBar && (
          <div className="flex flex-row w-full font-semibold lg:w-[300px] items-center">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search"
              className="relative block w-full form-input placeholder-[#72787E] bg-transparent border-none focus-visible:ring-0"
              onChange={(e) => SearchByText(e.target.value)} // Update searchTerm on change
            />
          </div>
        )}
        {selectAll && (
          <>
            <DropdownMenuCheckboxItem
              onSelect={(e) => e.preventDefault()}
              checked={selectedItems.length === options.length}
              onCheckedChange={handleSelectAllChange}
            >
              All
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator className="border border-dark2" />
          </>
        )}
        {filteredOptions.map((value: ISelectProps['options'][0], index: number) => {
          return (
            <DropdownMenuCheckboxItem
              onSelect={(e) => e.preventDefault()}
              key={index}
              checked={isOptionSelected(value.value)}
              onCheckedChange={() => handleSelectChange(value.value)}
            >
              {value.label}
            </DropdownMenuCheckboxItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MultiSelect
