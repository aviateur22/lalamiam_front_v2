import { environment } from "src/environments/environment"
import { IProfessionalRegisterDto } from "../module/auth/models/auth-dto.";
import { APP_CONSTANTS } from "src/misc/constant";
import { IClientRegisterAsProfessionalDto } from "../module/client/models/client.dto";

export function apiPath(endPoint: string): string {
  return environment.api_base + endPoint
}


/**
 * FormData
 * @param professionalRegisterDto
 * @param file1
 * @param file2
 * @returns
 */
export function getFormData(professionalRegisterDto: IProfessionalRegisterDto | IClientRegisterAsProfessionalDto, file1: File, file2: File): FormData {
  const formData = new FormData();

  if('password' in professionalRegisterDto)
    formData.append('password', professionalRegisterDto.password);

  if('nickname' in professionalRegisterDto)
  formData.append('nickname', professionalRegisterDto.nickname);

  formData.append('email', professionalRegisterDto.email);
  formData.append('firstName', professionalRegisterDto.firstName);
  formData.append('lastName', professionalRegisterDto.lastName);
  formData.append('phone', professionalRegisterDto.phone);
  formData.append('file1', file1);
  formData.append('file2', file2??new Blob(), file2 !=null ? file2.name : APP_CONSTANTS.FILE_EMPTY_NAME);
  formData.append('userCaptchaResponse.clientResponse', professionalRegisterDto.captchaResponseDto.clientResponse);
  formData.append('userCaptchaResponse.captchaResponseIdEncrypt', professionalRegisterDto.captchaResponseDto.captchaResponseIdEncrypt);
debugger
  return formData;
}
