import { inject, injectable } from 'tsyringe'
import { ITransactionRepository } from '../../repositories/ITransactionRepository'
import { ICreateTransactionDTO } from './CreateTransactionsDTO'
import { randomUUID } from 'node:crypto'

@injectable()
export class CreateTransactionsUseCase {
  constructor(
    @inject('KnexTransactionRepository')
    private transactionRepository: ITransactionRepository,
  ) {}

  async execute({ title, amount, type }: ICreateTransactionDTO) {
    await this.transactionRepository.create({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      type,
    })
  }
}
