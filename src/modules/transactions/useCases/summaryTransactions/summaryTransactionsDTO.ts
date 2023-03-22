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

export { ISummaryTransactionsDTO, IOutputSummaryRepository }
