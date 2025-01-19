import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICaptchaDto, ILoginDto, ILoginResponseDto, IProfessionalRegisterDto, IRegisterDto, IRegisterResponseDto } from '../models/auth-dto.';
import { catchError, firstValueFrom, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import backendUrl from 'src/misc/backend.url';
import { LogUtility } from 'src/utils/log.utility';
import { Captcha } from '../models/auth.model';
import { captchaMapper } from '../models/map-to-model';

import * as FlashMessageAction from "./../../common/store/flash-message.action";
import { FlashMessage } from '../../common/model/common.model';
import { IAppState } from 'src/store/state';
import { Store } from '@ngrx/store';
import { APP_CONSTANTS } from 'src/misc/constant';
import { StorageService } from 'src/app/module/common/service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _storageService: StorageService, private _http: HttpClient, private _store: Store<IAppState>) { }

  login(loginDto: ILoginDto):Observable<ILoginResponseDto> {

    return this._http.post<ILoginResponseDto>(this.apiPath(backendUrl.login), loginDto).pipe(
      map(loginResponse=>{
        this._store.dispatch(FlashMessageAction.addMessageToList({ flashMessage: new FlashMessage(loginResponse.responseMessage, false)}))
        var userString = JSON.stringify({
          userId: loginResponse.id,
          email: loginResponse.email,
          jwt: loginResponse.jwt,
          roles: loginResponse.roles
        });

        this._storageService.setItem(APP_CONSTANTS.USER, userString)
        return loginResponse

      }),
      catchError(error => {
        const errorMessage: string = error.error.error;
        this._store.dispatch(FlashMessageAction.addMessageToList({ flashMessage: new FlashMessage(errorMessage, true)}))
        return throwError(() => error);
      })
    );
  }

  /**
   * Creation client
   * @param registerDto Dto
   * @returns
   */
  register(registerDto: IRegisterDto): Observable<IRegisterResponseDto> {
      return this._http.post<ILoginResponseDto>(this.apiPath(backendUrl.register), registerDto);
  }

  /**
   * Création d'un compte professionel sans qua le personne ne soit déja client
   * @param professionalRegisterDto
   */
  professionalRegister(professionalRegisterDto: IProfessionalRegisterDto): Observable<IRegisterResponseDto> {
    return this._http.post<ILoginResponseDto>(this.apiPath(backendUrl.professionalRegister), professionalRegisterDto).pipe(
      map(registerResponse=>{
        this._store.dispatch(FlashMessageAction.addMessageToList({ flashMessage: new FlashMessage(registerResponse.responseMessage, false)}))
        return registerResponse
      }),
      catchError(error=>{
        const errorMessage: string = error.error.error;
        this._store.dispatch(FlashMessageAction.addMessageToList({ flashMessage: new FlashMessage(errorMessage, true)}))
        return of({} as ILoginResponseDto);
      })
    )
  }
  /**
   * Récupération token CSRF
   * @returns Promise<void>
   */
  async getCsrfToken(): Promise<void> {
   return firstValueFrom(this._http.get(this.apiPath(backendUrl.csrf), {observe: 'response'})).then(res=>{
   });
  }

  /**
   * Recupération du captcha
   * @returns Captcha
   */
  getCaptcha(): Observable<Captcha> {
    return this._http.get<ICaptchaDto>(this.apiPath(backendUrl.captcha)).pipe(
      tap(captchaDto=> this._storageService.setItem(APP_CONSTANTS.CAPTCHA_EXPECTED_RESPONSE, captchaDto.captchaResponseIdEncrypt)),
      map(captchaDto=>captchaMapper(captchaDto, captchaDto.captchaQuestionImageBase64))
    )
  }

  private apiPath(endPoint: string): string {
    return environment.api_base + endPoint
  }
}
