interface ICreateUserDTO {
  login: string
  email: string
  password: string
}

interface IOutPutUserDTO {
  login: string
  email: string
  password: string
}

export { ICreateUserDTO, IOutPutUserDTO }
