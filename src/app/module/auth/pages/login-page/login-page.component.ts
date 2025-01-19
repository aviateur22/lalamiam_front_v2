import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppParamService } from 'src/app/module/init/services/app-param.service';
import frontendUrl from 'src/misc/frontend.url';
import { AuthService } from '../../services/auth.service';
import { ILoginDto } from '../../models/auth-dto.';
import { LogUtility } from 'src/utils/log.utility';
import { LoadCsrf } from 'src/app/load-csrf';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent extends LoadCsrf {
  // Properiete
  properties: any;
  resetPasswordLink: string =  `/${frontendUrl.lostPasswordMailingPage.url}`;
  registerLink = `/${frontendUrl.register.url}`;
  loginFG: FormGroup = this._fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private _authService: AuthService,private _fb: FormBuilder, private _appParam: AppParamService, private _router: Router) {
    super(_authService);
  }


  ngOnInit(): void {
    this.properties = this._appParam.getProperties();
  }

  login() {
    if(!this.loginFG.valid)
      return this.loginFG.markAllAsTouched();

    const login: ILoginDto = {
      email: this.loginFG.get('email')?.value,
      password: this.loginFG.get('password')?.value
    }

    this._authService.login(login).subscribe({
      next:(loginResponse) =>{
        this._router.navigate([frontendUrl.userHome.url]);
      }


    });

  }

}
