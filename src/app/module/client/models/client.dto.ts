import { ICaptchaImageDto, IUserCaptchaResponseDto } from "src/app/model/captcha.dto";

export interface IClientRegisterAsProfessionalDto {
  email: string,
  lastName: string,
  firstName: string,
  phone: string,
  file1: File,
  file2: File
  captchaResponseDto: IUserCaptchaResponseDto
}

