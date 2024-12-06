import { FixedNumber } from 'ethers'
import { fnHelper } from '../helpers/fixed-numbers'

export const formatCurrency = (number: never, minimumFractionDigits = 2, maximumFractionDigits = 6) => {
  if (!isNaN(+number) && +number !== 0) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits,
      maximumFractionDigits,
    })
    return formatter.format(+number)
  }
  return number
}

const ABBREVIATIONS: Record<string, number> = {
  B: 1000000000,
  M: 1000000,
  K: 1000,
}

export const formatCurrencyShort = (number: number) => {
  for (const symbol in ABBREVIATIONS) {
    if (number >= ABBREVIATIONS[symbol]) {
      return (number / ABBREVIATIONS[symbol]).toFixed(1).replace(/\.?0+$/, '') + symbol
    }
  }
  return number.toFixed(2)
}

export const formatNumber = (
  number: number | bigint | Intl.StringNumericLiteral,
  maximumFractionDigits = 5,
  minimumFractionDigits = 2,
) => {
  const nf = new Intl.NumberFormat('en-US', {
    maximumFractionDigits,
    minimumFractionDigits:
      minimumFractionDigits > maximumFractionDigits ? maximumFractionDigits : minimumFractionDigits,
  })
  return nf.format(number)
}

export const formatNumberWithExchange = (
  number: FixedNumber | number,
  exchange: never,
  maximumFractionDigits = 5,
  minimumFractionDigits = 2,
) => {
  const fn = fnHelper.from(number)
  const rate = fnHelper.from(exchange)
  number = fn.divUnsafe(rate)
  const nf = new Intl.NumberFormat('en-US', {
    maximumFractionDigits,
    minimumFractionDigits:
      minimumFractionDigits > maximumFractionDigits ? maximumFractionDigits : minimumFractionDigits,
  })
  return nf.format(number as unknown as number)
}

export const formatNumberEnUs = (number: number, maximumFractionDigits?: number, minimumFractionDigits?: number) => {
  if (isNaN(+number) || !number) {
    return 0
  }

  const num = number
    .toLocaleString('en-US', {
      maximumFractionDigits,
      minimumFractionDigits,
    })
    .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1')
  return num
}

export const formatCurrencyTwoDigit = (number: number, hasAbbreviation: boolean) => {
  if (isNaN(+number) || !number) {
    return 0
  }

  const abbreviations: Record<string, number> = {
    B: 1000000000,
    M: 1000000,
  }

  if (hasAbbreviation) {
    if (number >= abbreviations.M) {
      for (const abbreviation in abbreviations) {
        if (number >= abbreviations[abbreviation]) {
          const num = formatNumberEnUs(number / abbreviations[abbreviation], 2)
          return num + abbreviation
        }
      }
    } else {
      const num = formatNumberEnUs(number, 6)
      return num.toString()
    }
  } else {
    const num = formatNumberEnUs(number, 2)
    return num.toString()
  }
}

/**
 * Did not use AI to write this function. Pure human brain
 *
 * @param num
 * @returns string
 */
export const formatPrice = (num: number): number => {
  const str = num.toString()

  // if number is natural number, return it as is
  if (!str.includes('.')) return num
  const [integer, decimal] = str.split('.')

  // if no decimal, return integer
  if (!decimal || decimal === '') return Number(integer)

  // format decimal to last 2 non-zero digits
  for (let i = 0; i < decimal.length - 1; i++) {
    if (decimal[i] !== '0') return Number(`${integer}.${decimal.slice(0, i + 2)}`)
  }
  return num
}
