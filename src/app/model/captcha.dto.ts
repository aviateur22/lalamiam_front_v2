export interface ICaptchaDto {
  captchaTitle: string,
  captchaQuestionImageBase64: ICaptchaImageDto,
  captchaResponseIdEncrypt: string
}

export interface ICaptchaImageDto {
  mimeType: string,
  base64Format: string,
}

export interface IUserCaptchaResponseDto {
  clientResponse: string,
  captchaResponseIdEncrypt: string
}
