import { IResponse } from "src/app/model/response-dto";

export interface ILoginDto {
  email: string,
  password: string
}

export interface ILoginResponseDto extends IResponse {
  jwt: string,
  id: BigInt
  email: string,
  roles: string[],
}

export interface IUserCaptchaResponseDto {
  clientResponse: string,
  captchaResponseIdEncrypt: string
}

export interface IRegisterDto {
  email: string,
  password: string,
  nickName: string,
  userCaptchaResponse: IUserCaptchaResponseDto
}

export interface IProfessionalRegisterDto extends IRegisterDto {
  lastName: string,
  firstName: string,
  phone: string
}

export interface IRegisterResponseDto extends IResponse {

}

export interface ICaptchaDto {
  captchaTitle: string,
  captchaQuestionImageBase64: ICaptchaImageDto,
  captchaResponseIdEncrypt: string
}

export interface ICaptchaImageDto {
  mimeType: string,
  base64Format: string,
}
