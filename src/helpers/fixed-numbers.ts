import BN from 'bn.js'
import { BigNumber, FixedNumber } from 'ethers'
import { parseUnits } from 'ethers/lib/utils'

const toBigNumber = (value: FixedNumber, decimals: number) => {
  const v = parseUnits(value.toString(), decimals)
  return v
}

const from = (value: FixedNumber | BigNumber | number | string, decimals = 18) => {
  if (typeof value === 'number' || typeof value === 'string') {
    return FixedNumber.from(value.toString())
  }
  if ((value as FixedNumber)._isFixedNumber) return value as FixedNumber
  return FixedNumber.fromValue(value as BigNumber, decimals)
}

const fromSafe = (value: BigNumber | number | string, decimals = 18) => {
  try {
    return from(value, decimals)
  } catch {
    return FixedNumber.from(0)
  }
}

const fromDecimalsSafe = (value: bigint | string | BigNumber | BN | number | undefined | null, decimals = 9) => {
  try {
    return fromDecimals(value || '0', decimals)
  } catch {
    return FixedNumber.from(0)
  }
}

const fromDecimals = (value: bigint | string | BigNumber | BN | number, decimals = 9) => {
  if (BN.isBN(value) || typeof value === 'string' || typeof value === 'bigint' || typeof value === 'number') {
    value = BigNumber.from(value.toString())
  }
  if (!BigNumber.isBigNumber(value)) {
    throw new Error('Does not support', value)
  }
  return FixedNumber.fromValue(value, decimals)
}

const cmp = (_this: FixedNumber, other: FixedNumber) => {
  const a = _this.toUnsafeFloat()
  const b = other.toUnsafeFloat()

  if (a < b) return -1
  if (a > b) return 1
  return 0
}

const gt = (a: FixedNumber, b: FixedNumber) => {
  return cmp(a, b) > 0
}

const gte = (a: FixedNumber, b: FixedNumber) => {
  return cmp(a, b) >= 0
}

const lt = (a: FixedNumber, b: FixedNumber) => {
  return cmp(a, b) < 0
}

const lte = (a: FixedNumber, b: FixedNumber) => {
  return cmp(a, b) <= 0
}

const eq = (a: FixedNumber, b: FixedNumber) => {
  return cmp(a, b) === 0
}

const min = (...args: FixedNumber[]) => {
  return args.reduce((acc, cur) => (cmp(acc, cur) < 0 ? acc : cur))
}

const max = (...args: FixedNumber[]) => {
  return args.reduce((acc, cur) => (cmp(acc, cur) > 0 ? acc : cur))
}

const toBN = (value: FixedNumber, decimals: number) => {
  const v = parseUnits(value.toString(), decimals)
  return new BN(v.toString())
}

export const fnHelper = {
  gt,
  gte,
  lt,
  lte,
  eq,
  toBigNumber,
  min,
  max,
  from,
  fromSafe,
  fromDecimals,
  fromDecimalsSafe,
  toBN,
}
