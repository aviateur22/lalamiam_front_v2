import { Component } from '@angular/core';
import { LoadCsrf } from 'src/app/load-csrf';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppParamService } from 'src/app/module/init/services/app-param.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProfessionalRegisterConfirmationDto } from '../../models/auth-dto.';
import { LogUtility } from 'src/utils/log.utility';
import frontendUrl from 'src/misc/frontend.url';

@Component({
  selector: 'app-professional-register-confirmation-page',
  templateUrl: './professional-register-confirmation-page.component.html',
  styleUrls: ['./professional-register-confirmation-page.component.css']
})
export class ProfessionalRegisterConfirmationPageComponent extends LoadCsrf {

  // Données de URL
  urlToken: string | null = '';
  userEmail: string | null = '';

  errorLink = `/${frontendUrl.error.url}`;

  registerConfirmationFG: FormGroup = this._fb.group({
    emailToken: ['', Validators.required]
  });

  constructor(
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _appParam: AppParamService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    super(_authService, _appParam);
  }

  ngOnInit() {
    this.userEmail = this._activatedRoute.snapshot.paramMap.get('user-email');
    this.urlToken = this._activatedRoute.snapshot.paramMap.get('confirmation-token');

    if(this.userEmail === null || this.userEmail.trim() === '' || this.urlToken === null || this.urlToken.trim() === '') {
      this._router.navigate([`${this.errorLink}`]);
    }

    LogUtility.log(ProfessionalRegisterConfirmationPageComponent.name, this.userEmail);
    LogUtility.log(ProfessionalRegisterConfirmationPageComponent.name, this.urlToken);
  }

  /**
   * Confirmation de l'inscription
   */
  confirmRegistration() {
    if(!this.registerConfirmationFG.valid)
      return this.registerConfirmationFG.markAllAsTouched();

    const data: IProfessionalRegisterConfirmationDto = {
      emailToken: this.registerConfirmationFG.get('emailToken')?.value,
      email: this.userEmail!,
      urlToken: this.urlToken!
    }

    this._authService.professionalRegisterConfirmation(data).subscribe({
      next:(response) =>{
          LogUtility.log(ProfessionalRegisterConfirmationPageComponent.name, response.responseMessage);
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }




}
