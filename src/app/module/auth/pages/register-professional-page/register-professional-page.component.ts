import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppParamService } from 'src/app/module/init/services/app-param.service';
import { IProfessionalRegisterDto } from '../../models/auth-dto.';
import { AuthService } from '../../services/auth.service';
import { LoadCsrf } from 'src/app/load-csrf';
import { APP_CONSTANTS } from 'src/misc/constant';
import { StorageService } from 'src/app/module/common/service/storage.service';

@Component({
  selector: 'app-register-professional-page',
  templateUrl: './register-professional-page.component.html',
  styleUrls: ['./register-professional-page.component.css']
})
export class RegisterProfessionalPageComponent extends LoadCsrf {

  file1: File | null = null;
  file2: File | null = null;

  registerFG: FormGroup = this._fb.group({
    email: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    password: ['', Validators.required],
    passwordCfm: ['', Validators.required],
    nickname: ['', Validators.required],
    captchaResponse: ['', Validators.required],
    file1: ['', Validators.required],
    file2: ['']
  });

  constructor(
    private _storageService: StorageService,
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _appParamService: AppParamService
  ){
    super(_authService, _appParamService)
  }

  onFile1Selected(file: File) {
    console.log(file);
    this.file1 = file;
  }

  onFile2Selected(file: File) {
    this.file2 = file;
    console.log(file);
  }


   register() {
      if(!this.registerFG.valid)
        return this.registerFG.markAllAsTouched();


      const register: IProfessionalRegisterDto = {
        email: this.registerFG.get('email')?.value,
        lastName: this.registerFG.get('lastName')?.value,
        firstName: this.registerFG.get('firstName')?.value,
        phone: this.registerFG.get('phone')?.value,
        password: this.registerFG.get('password')?.value,
        nickname: this.registerFG.get('nickname')?.value,
        file1: this.registerFG.get('file1')?.value,
        file2: this.registerFG.get('file2')?.value,
        userCaptchaResponse: {
          captchaResponseIdEncrypt: this._storageService.getItem(APP_CONSTANTS.CAPTCHA_EXPECTED_RESPONSE),
          clientResponse: this.registerFG.get('captchaResponse')?.value
        }
      }

      this._authService.professionalRegister(register, this.file1!, this.file2!).subscribe({
        next:(response)=>{console.log(response)},
        error:(error)=>{

        }

      });

    }
}
