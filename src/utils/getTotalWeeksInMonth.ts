import dayjs from 'dayjs'

export function getTotalWeeksInMonth(month: number, year: number) {
  const daysInMonth = dayjs(`${year}-${month}-01`).daysInMonth()
  const weeksInMonth = Math.ceil(daysInMonth / 7) + 1
  return weeksInMonth
}
