interface IInputTransactionByIdDTO {
  id: string
  userId: string
}
interface IOutputTransactionByIdDTO {
  id: string
  title: string
  amount: number
  user_id: string
  category_id: string
  release_date: Date
}
export { IInputTransactionByIdDTO, IOutputTransactionByIdDTO }
