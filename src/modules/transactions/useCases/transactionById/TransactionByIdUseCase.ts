import { inject, injectable } from 'tsyringe'
import { ITransactionRepository } from '../../repositories/ITransactionRepository'
import { IInputTransactionByIdDTO } from './TransactionByIdDTO'

@injectable()
export class TransactionByIdUseCase {
  constructor(
    @inject('KnexTransactionRepository')
    private transactionRepository: ITransactionRepository,
  ) {}

  async execute({ id, userId }: IInputTransactionByIdDTO) {
    const transaction = await this.transactionRepository.findByIdTransaction({
      userId,
      id,
    })

    return transaction
  }
}
