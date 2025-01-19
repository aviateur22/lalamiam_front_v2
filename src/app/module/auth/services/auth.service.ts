import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICaptchaDto, ILoginDto, ILoginResponseDto, IRegisterDto, IRegisterResponseDto } from '../models/auth-dto.';
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

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient, private _store: Store<IAppState>) { }

  login(loginDto: ILoginDto):Observable<ILoginResponseDto> {

    return this._http.post<ILoginResponseDto>(this.apiPath(backendUrl.login), loginDto).pipe(
      map(loginResponse=>{
        this._store.dispatch(FlashMessageAction.addMessageToList({ flashMessage: new FlashMessage(loginResponse.responseMessage, false)}))
        localStorage.setItem('user', JSON.stringify({
          userId: loginResponse.id,
          email: loginResponse.email,
          jwt: loginResponse.jwt,
          roles: loginResponse.roles
        }));
        LogUtility.log(AuthService.name, loginResponse.responseMessage);
        return loginResponse

      }),
      catchError(error => {
        const errorMessage: string = error.error.error;
        this._store.dispatch(FlashMessageAction.addMessageToList({ flashMessage: new FlashMessage(errorMessage, true)}))
        FlashMessageAction.addMessageToList({ flashMessage: new FlashMessage(errorMessage, true)})
        return of({} as ILoginResponseDto);
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
   * Récupération token CSRF
   * @returns Promise<void>
   */
  async getCsrfToken(): Promise<void> {
   return firstValueFrom(this._http.get(this.apiPath(backendUrl.csrf), {observe: 'response'})).then(res=>{
      LogUtility.log(AuthService.name, res.headers)
      console.log(res.headers)
   });
  }

  /**
   * Recupération du captcha
   * @returns Captcha
   */
  getCaptcha(): Observable<Captcha> {
    return this._http.get<ICaptchaDto>(this.apiPath(backendUrl.captcha)).pipe(
      map(captchaDto=>captchaMapper(captchaDto, captchaDto.captchaQuestionImageBase64))
    )
  }

  private apiPath(endPoint: string): string {
    return environment.api_base + endPoint
  }
}
