export class Captcha {
  constructor(
    public readonly captchaTitle: string,
    public readonly captchaImage: CaptchaImage
  ) {}
}

export class CaptchaImage {
  constructor(
    public readonly image: string,
    public readonly mimeType: string
  ) {}

}
