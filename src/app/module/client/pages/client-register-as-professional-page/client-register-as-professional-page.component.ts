import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadCsrf } from 'src/app/load-csrf';
import { AuthService } from 'src/app/module/auth/services/auth.service';
import { StorageService } from 'src/app/module/common/service/storage.service';
import { AppParamService } from 'src/app/module/init/services/app-param.service';
import { IClientRegisterAsProfessionalDto } from '../../models/client.dto';
import { APP_CONSTANTS } from 'src/misc/constant';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import frontendUrl from 'src/misc/frontend.url';

@Component({
  selector: 'app-client-register-as-professional-page',
  templateUrl: './client-register-as-professional-page.component.html',
  styleUrls: ['./client-register-as-professional-page.component.css']
})
export class ClientRegisterAsProfessionalPageComponent extends LoadCsrf {
  file1: File | null = null;
  file2: File | null = null;

  userEmail: string | null = '';

  errorLink = `/${frontendUrl.error.url}`;

  registerFG: FormGroup = this._fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    captchaResponse: ['', Validators.required],
    file1: ['', Validators.required],
    file2: ['']
  });

  public constructor(
    private _storageService: StorageService,
    private _authService: AuthService,
    private _clientService: ClientService,
    private _fb: FormBuilder,
    private _appParamService: AppParamService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {
      super(_authService, _appParamService);
  }

  ngOnInit() {
    this.userEmail = this._activatedRoute.snapshot.paramMap.get('user-email');

    if(this.userEmail === null || this.userEmail.trim() === '') {
      this._router.navigate([`${this.errorLink}`]);
    }
  }


  onFile1Selected(file: File) {
    this.file1 = file;
  }

  onFile2Selected(file: File) {
    this.file2 = file;
  }

  register() {
    if(!this.registerFG.valid)
      return this.registerFG.markAllAsTouched();

    const register: IClientRegisterAsProfessionalDto = {
      email: this.userEmail!,
      lastName: this.registerFG.get('lastName')?.value,
      firstName: this.registerFG.get('firstName')?.value,
      phone: this.registerFG.get('phone')?.value,
      file1: this.registerFG.get('file1')?.value,
      file2: this.registerFG.get('file2')?.value,
      captchaResponseDto: {
        clientResponse: this.registerFG.get('captchaResponse')?.value,
        captchaResponseIdEncrypt: this._storageService.getItem(APP_CONSTANTS.CAPTCHA_EXPECTED_RESPONSE),
      }
    }

    this._clientService.clientRegisterAsProfessional(register, this.file1!, this.file2!).subscribe({
      next:response=>{console.log(response)},
      error:(error)=>{

      }
    })
  }
}
