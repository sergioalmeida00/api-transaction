interface ICreateUserDTO {
  login: string
  email: string
  password: string
}

interface IOutPutUserDTO {
  id?: string
  login: string
  email: string
  password: string
}

export { ICreateUserDTO, IOutPutUserDTO }
