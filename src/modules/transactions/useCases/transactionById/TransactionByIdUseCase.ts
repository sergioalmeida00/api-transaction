import { inject, injectable } from 'tsyringe'
import { ITransactionRepository } from '../../repositories/ITransactionRepository'
import {
  IInputTransactionByIdDTO,
  IOutputTransactionByIdDTO,
} from './TransactionByIdDTO'

@injectable()
export class TransactionByIdUseCase {
  constructor(
    @inject('KnexTransactionRepository')
    private transactionRepository: ITransactionRepository,
  ) {}

  async execute({
    id,
    userId,
  }: IInputTransactionByIdDTO): Promise<IOutputTransactionByIdDTO> {
    const transaction = await this.transactionRepository.findByIdTransaction({
      userId,
      id,
    })

    return transaction
  }
}
