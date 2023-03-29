interface ISummaryTransactionsDTO {
  totalIncome: number
  totalExpense: number
  totalBalance: number
  weekSummary: number
  daySummary: number
}

interface IOutputSummaryRepository {
  amount: number
}

interface IInputSummaryTransactionsDTO {
  userId: string
  startDateMont: string
  endDateMontFormat: string
}

export {
  ISummaryTransactionsDTO,
  IOutputSummaryRepository,
  IInputSummaryTransactionsDTO,
}
