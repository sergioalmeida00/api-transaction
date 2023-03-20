import { ICreateTransactionDTO } from '../useCases/createTransactions/CreateTransactionsDTO'

export class TransactionsMap {
  static toDTO(transactions: ICreateTransactionDTO[]) {
    const transactionsMapper = transactions.map(
      ({ amount, ...transactions }) => ({
        ...transactions,
        amount: Number(amount),
      }),
    )

    return transactionsMapper
  }
}
