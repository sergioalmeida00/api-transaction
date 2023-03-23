interface IOutputSummaryTypeCategoryDTO {
  type: string
  amount: number
}
interface IOutputSummaryTypeCategoryReduceDTO {
  [key: string]: number
  // outras propriedades e métodos
}
export { IOutputSummaryTypeCategoryDTO, IOutputSummaryTypeCategoryReduceDTO }
