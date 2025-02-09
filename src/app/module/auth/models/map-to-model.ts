
import { ICaptchaDto, ICaptchaImageDto } from "src/app/model/captcha.dto";
import { Captcha, CaptchaImage } from "src/app/model/captcha.model";


export function captchaMapper(captchaDto: ICaptchaDto, captchaImage: ICaptchaImageDto) {
  var captchaImageModel = captchaImageMapper(captchaImage);

  return new Captcha(captchaDto.captchaTitle, captchaImageModel);
}

export function captchaImageMapper(captchaImage: ICaptchaImageDto): CaptchaImage {
  return new CaptchaImage(captchaImage.base64Format, captchaImage.mimeType);
}
