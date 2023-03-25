interface ICreateTransactionDTO {
  id?: string
  title: string
  amount: number
  userId: string
  type: 'credit' | 'debit'
  categoryId: string
  releaseDate: Date
}

export { ICreateTransactionDTO }
