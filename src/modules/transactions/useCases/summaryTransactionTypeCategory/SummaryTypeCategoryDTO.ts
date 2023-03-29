interface IOutputSummaryTypeCategoryDTO {
  type: string
  amount: number
}
interface IOutputSummaryTypeCategoryReduceDTO {
  [key: string]: number
}

interface IInputSummaryTypeCategoryDTO {
  userId: string
  startDate: Date
  endDate: Date
}

export {
  IOutputSummaryTypeCategoryDTO,
  IOutputSummaryTypeCategoryReduceDTO,
  IInputSummaryTypeCategoryDTO,
}
