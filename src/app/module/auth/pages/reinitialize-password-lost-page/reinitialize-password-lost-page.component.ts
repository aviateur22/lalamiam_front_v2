import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadCsrf } from 'src/app/load-csrf';
import { AppParamService } from 'src/app/module/init/services/app-param.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import frontendUrl from 'src/misc/frontend.url';
import { IReinitializeLostPasswordDto } from '../../models/auth-dto.';
import { LogUtility } from 'src/utils/log.utility';

@Component({
  selector: 'app-reinitialize-password-lost-page',
  templateUrl: './reinitialize-password-lost-page.component.html',
  styleUrls: ['./reinitialize-password-lost-page.component.css']
})
export class ReinitializePasswordLostPageComponent extends LoadCsrf {

  changePasswordFG: FormGroup = this._fb.group({
    'password': ['', Validators.required],
    'confirmPassword': ['', Validators.required],

  });

   // Données de URL
   urlToken: string | null = '';
   userEmail: string | null = '';

  constructor(
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _appParamService: AppParamService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    super(_authService, _appParamService);
  }

  ngOnInit() {
    this.userEmail = this._activatedRoute.snapshot.paramMap.get('user-email');
    this.urlToken = this._activatedRoute.snapshot.paramMap.get('change-account-password-token');

    if(this.userEmail === null || this.userEmail.trim() === '' || this.urlToken === null || this.urlToken.trim() === '') {
      this._router.navigate([`${frontendUrl.error.url}`]);
    }
  }

  /**
   * Modification du mot de passe
   * @returns
   */
  changePassword() {
    if(!this.changePasswordFG.valid)
      return this.changePasswordFG.markAllAsTouched();

    const data: IReinitializeLostPasswordDto = {
      password: this.changePasswordFG.get('password')?.value,
      urlToken: this.urlToken!,
      email: this.userEmail!
    }

    this._authService.reinitializeLostPassword(data).subscribe({
      next: (response) =>{
                LogUtility.log(ReinitializePasswordLostPageComponent.name, response.responseMessage);
    }
  });
  }
}
