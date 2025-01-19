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

  // Properties contenant les données du formulaire
  properties: any;


  registerFG: FormGroup = this._fb.group({
    email: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    password: ['', Validators.required],
    passwordCfm: ['', Validators.required],
    nickName: ['', Validators.required],
    captchaResponse: ['', Validators.required]
  });

  constructor(
    private _storageService: StorageService,
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _appParamService: AppParamService
  ){
    super(_authService)
  }

  ngOnInit() {
    this.properties = this._appParamService.getProperties();
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
        nickName: this.registerFG.get('nickName')?.value,
        userCaptchaResponse: {
          captchaResponseIdEncrypt: this._storageService.getItem(APP_CONSTANTS.CAPTCHA_EXPECTED_RESPONSE),
          clientResponse: this.registerFG.get('captchaResponse')?.value
        }
      }

      this._authService.professionalRegister(register).subscribe({
        next:(response)=>{},
        error:(error)=>{

        }

      });

    }
}
