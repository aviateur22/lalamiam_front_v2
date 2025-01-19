import { ICaptchaDto, ICaptchaImageDto } from "./auth-dto.";
import { Captcha, CaptchaImage } from "./auth.model";

export function captchaMapper(captchaDto: ICaptchaDto, captchaImage: ICaptchaImageDto) {
  var captchaImageModel = captchaImageMapper(captchaImage);

  return new Captcha(captchaDto.captchaTitle, captchaImageModel);
}

export function captchaImageMapper(captchaImage: ICaptchaImageDto): CaptchaImage {
  return new CaptchaImage(captchaImage.base64Format, captchaImage.mimeType);
}
