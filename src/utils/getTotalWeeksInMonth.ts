import dayjs from 'dayjs'

export function getTotalWeeksInMonth(): number {
  const currentDate = dayjs()
  const endDateMonth = dayjs(currentDate).endOf('month')
  const differenceInDays = endDateMonth.diff(currentDate, 'days')
  const weeksInMonth = Math.ceil(differenceInDays / 7) + 1

  return weeksInMonth
}
