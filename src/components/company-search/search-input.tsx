import { CompanyModel } from '@/hooks/use-company-search'
import { Search } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

interface Props<T> {
  results?: T[]
  renderItem(item: T): JSX.Element
  onChange?: React.ChangeEventHandler
  onSelect?: (item: T) => void
  value: CompanyModel | null
  searchInput: string
}

const LiveSearch = <T extends object>({
  results = [],
  renderItem,
  value,
  onChange,
  onSelect,
  searchInput,
}: Props<T>): JSX.Element => {
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const resultContainer = useRef<HTMLDivElement>(null)
  const [showResults, setShowResults] = useState(false)
  const [defaultValue, setDefaultValue] = useState('')

  const handleSelection = (selectedIndex: number) => {
    const selectedItem = results[selectedIndex]
    if (!selectedItem) return resetSearchComplete()
    if (onSelect) {
      onSelect(selectedItem)
    }

    resetSearchComplete()
  }

  const resetSearchComplete = useCallback(() => {
    setFocusedIndex(-1)
    setShowResults(false)
  }, [])

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    const { key } = e
    let nextIndexCount = 0

    // move down
    if (key === 'ArrowDown') nextIndexCount = (focusedIndex + 1) % results.length

    // move up
    if (key === 'ArrowUp') nextIndexCount = (focusedIndex + results.length - 1) % results.length

    // hide search results
    if (key === 'Escape') {
      resetSearchComplete()
    }

    // select the current item
    if (key === 'Enter') {
      e.preventDefault()
      handleSelection(focusedIndex)
    }

    setFocusedIndex(nextIndexCount)
  }

  type changeHandler = React.ChangeEventHandler<HTMLInputElement>
  const handleChange: changeHandler = (e) => {
    setDefaultValue(e.target.value)
    if (onChange) {
      onChange(e)
    }
  }

  useEffect(() => {
    if (!resultContainer.current) return

    resultContainer.current.scrollIntoView({
      block: 'center',
    })
  }, [focusedIndex])

  useEffect(() => {
    if (results.length > 0 && !showResults) setShowResults(true)

    if (results.length <= 0) setShowResults(false)
  }, [results])

  useEffect(() => {
    if (value) setDefaultValue(value.name ?? '')
    else setDefaultValue(searchInput)
  }, [value])

  return (
    <div tabIndex={1} onBlur={resetSearchComplete} onKeyDown={handleKeyDown} className="relative">
      <Search className="pointer-events-none w-4 h-4 absolute top-1/2 transform -translate-y-1/2 left-3 text-dark3"></Search>
      <input
        value={defaultValue}
        onChange={handleChange}
        placeholder="Search name"
        className="border border-gray-900 py-3 px-4 bg-dark0 placeholder:text-dark3 appearance-none w-full block pl-9 focus:outline-none text-dark5"
      />

      {/* Search Results Container */}
      {showResults && (
        <div
          className="absolute mt-1 w-full p-2 bg-dark0 shadow-lg rounded-bl rounded-br max-h-56 overflow-y-auto z-[60]"
          style={{ scrollbarColor: '#72787e transparent', scrollbarWidth: 'thin' }}
        >
          {results.map((item, index) => {
            return (
              <div
                key={index}
                onMouseDown={() => handleSelection(index)}
                ref={index === focusedIndex ? resultContainer : null}
                style={{
                  backgroundColor: index === focusedIndex ? 'rgba(0,0,0,0.1)' : '',
                }}
                className="cursor-pointer hover:bg-black hover:bg-opacity-10"
              >
                {renderItem(item)}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default LiveSearch
