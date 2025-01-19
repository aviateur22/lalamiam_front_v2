import { Component } from '@angular/core';
import { LoadCsrf } from 'src/app/load-csrf';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppParamService } from 'src/app/module/init/services/app-param.service';
import { IRegisterDto } from '../../models/auth-dto.';
import { LogUtility } from 'src/utils/log.utility';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent extends LoadCsrf {
  // Properiete
  properties: any;

  registerFG: FormGroup = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordCfm: ['', Validators.required],
      nickName: ['', Validators.required],
      captchaResponse: ['', Validators.required]
    });

  constructor(private _authService: AuthService,private _fb: FormBuilder, private _appParamService: AppParamService) {
    super(_authService);
  }

  ngOnInit() {
    this.properties = this._appParamService.getProperties();
  }

  register() {
    if(!this.registerFG.valid)
      return this.registerFG.markAllAsTouched();

    const register: IRegisterDto = {
      email: this.registerFG.get('email')?.value,
      password: this.registerFG.get('password')?.value,
      nickName: this.registerFG.get('nickName')?.value,
      userCaptchaResponse: {
        clientResponse: this.registerFG.get('captchaResponse')?.value,
        captchaResponseIdEncrypt: ''
      }
    }

    this._authService.register(register).subscribe(result=>{
      LogUtility.log(RegisterPageComponent.name, result);
    });

  }
}
