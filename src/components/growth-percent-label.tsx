export default function GrowthPercentLabel({ value }: { value: number }) {
  let display = ''
  if (value === 0) {
    display = ''
  } else if (value < 0) {
    display = value.toString() + '%'
  } else {
    display = '+' + value.toString() + '%'
  }
  const colorClass = value < 0 ? 'text-[#FF3434]' : 'text-[#00CE7C]'
  return <div className={`text-end ${colorClass}`}>{display}</div>
}
