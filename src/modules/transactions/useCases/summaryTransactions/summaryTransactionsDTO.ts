interface ISummaryTransactionsDTO {
  totalIncome: string
  totalExpense: string
  totalBalance: string
  weekSummary: string
  daySummary: string
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
