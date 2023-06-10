import { IOutputSummaryTypeCategoryReduceDTO } from '../useCases/summaryTransactionTypeCategory/SummaryTypeCategoryDTO'

export class SummaryCategoryTypeMap {
  static toDTO(data: IOutputSummaryTypeCategoryReduceDTO) {
    const summaryCategoryArray = Object.entries(data).map(([key, value]) => ({
      category: key,
      amount: Math.abs(value),
    }))

    return summaryCategoryArray
  }
}
