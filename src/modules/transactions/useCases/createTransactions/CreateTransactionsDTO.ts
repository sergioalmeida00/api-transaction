interface ICreateTransactionDTO {
  id?: string
  title: string
  amount: number
  type: 'credit' | 'debit'
}

export { ICreateTransactionDTO }
