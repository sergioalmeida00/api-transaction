interface IAuthenticateUserDTO {
  login: string
  password: string
}
interface IOutputAuthenticateUserDTO {
  token: string
}

export { IAuthenticateUserDTO, IOutputAuthenticateUserDTO }
