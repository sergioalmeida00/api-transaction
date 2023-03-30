interface ISummaryTransactionsDTO {
  totalIncome: number
  totalExpense: number
  totalBalance: number
  weekSummary: number
  daySummary: number
}

interface IOutputSummaryRepository {
  amount: number
  type: string
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
