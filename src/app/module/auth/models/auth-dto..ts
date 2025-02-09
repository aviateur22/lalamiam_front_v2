import { IUserCaptchaResponseDto } from "src/app/model/captcha.dto";
import { IResponseDto } from "src/app/model/response.dto";

export interface ILoginDto {
  email: string,
  password: string
}

export interface ILogoutDto {
  email: string,
  userId: bigint
}

export interface ILoginResponseDto extends IResponseDto {
  jwt: string,
  id: BigInt
  email: string,
  roles: string[],
}

export interface IProfessionalRegisterConfirmationDto {
  email: string,
  emailToken: string,
  urlToken: string
}

export interface IRegisterDto {
  email: string,
  password: string,
  nickname: string,
  captchaResponseDto: IUserCaptchaResponseDto
}

export interface IProfessionalRegisterDto extends IRegisterDto {
  lastName: string,
  firstName: string,
  phone: string,
  file1: File,
  file2: File
}

export interface IRegisterResponseDto extends IResponseDto {

}

export interface IReinitializeLostPasswordDto {
  password: string,
  urlToken: string,
  email: string
}

