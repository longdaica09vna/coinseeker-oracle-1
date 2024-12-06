export function convertBigNumberToString(input: number) {
  if (input > 1000000000) {
    //1,000,000,000
    return `${(input / 1000000000).toFixed(1)}B` // Use template literals for string interpolation
  }
  if (input > 1000000) {
    //1,000,000
    return `${(input / 1000000).toFixed(1)}M` // Use template literals for string interpolation
  }
  return input.toFixed(1)
}
export function numberWithCommas(x: number) {
  const parts = x.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}
export const numberHelper = {
  convertBigNumberToString,
  numberWithCommas,
}
