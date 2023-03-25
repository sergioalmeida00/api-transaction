import dayjs from 'dayjs'

export function getTotalWeeksInMonth() {
  const currentDate = dayjs()

  const startDateMont = dayjs(currentDate).startOf('month').format('YYYY-MM-DD')

  const endDateMonth = dayjs(currentDate).endOf('month')

  const endDateMontFormat = endDateMonth.format('YYYY-MM-DD')

  const differenceInDays = endDateMonth.diff(currentDate, 'days')

  const weeksInMonth = Math.ceil(differenceInDays / 7) + 1

  return { weeksInMonth, startDateMont, endDateMontFormat }
}
