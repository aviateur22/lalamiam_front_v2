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
  captchaResponseId: BigInt
}

export interface IRegisterDto {
  email: string,
  password: string,
  username: string,
  userCaptchaResponse: IUserCaptchaResponseDto
}

export interface IRegisterResponseDto extends IResponse {

}

export interface ICaptchaDto {
  captchaTitle: string,
  captchaQuestionImageBase64: ICaptchaImageDto,
  captchaExpectedResponseId: BigInt
}

export interface ICaptchaImageDto {
  mimeType: string,
  base64Format: string,
}
