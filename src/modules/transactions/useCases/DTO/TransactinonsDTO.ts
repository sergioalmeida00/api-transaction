interface GetTransactionsDTO {
  userId: string
  startDate?: string | undefined
  endDate?: string | undefined
}

interface TransactionsDTO {
  id: string
  title: string
  amount: number
  userId: string
  type: 'credit' | 'debit'
  categoryId: string
  releaseDate: Date
}
export { GetTransactionsDTO, TransactionsDTO }
