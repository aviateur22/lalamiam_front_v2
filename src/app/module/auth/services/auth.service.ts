import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICaptchaDto, ILoginDto, ILoginResponseDto, ILogoutDto, IProfessionalRegisterConfirmationDto, IProfessionalRegisterDto, IRegisterDto, IRegisterResponseDto, IReinitializeLostPasswordDto } from '../models/auth-dto.';
import { catchError, firstValueFrom, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import backendUrl from 'src/misc/backend.url';
import { LogUtility } from 'src/utils/log.utility';
import { Captcha, EmailState } from '../models/auth.model';
import { captchaMapper } from '../models/map-to-model';

import * as FlashMessageAction from "./../../common/store/flash-message.action";
import * as AuthAction from './../store/action';
import { FlashMessage } from '../../common/model/common.model';
import { IAppState } from 'src/store/state';
import { Store } from '@ngrx/store';
import { APP_CONSTANTS } from 'src/misc/constant';
import { StorageService } from 'src/app/module/common/service/storage.service';
import { IResponseDto } from 'src/app/model/response-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _storageService: StorageService, private _http: HttpClient, private _store: Store<IAppState>) { }

  login(loginDto: ILoginDto):Observable<ILoginResponseDto> {

    return this._http.post<ILoginResponseDto>(this.apiPath(backendUrl.login), loginDto).pipe(
      map(loginResponse=>{
        this._store.dispatch(AuthAction.addUserOnLoginSuccess({ userEmail: new EmailState(loginResponse.email)}))
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
   * logout
   * @param logoutDto
   * @returns
   */
  logout(logoutDto: ILogoutDto) {
    return this._http.post<IResponseDto>(this.apiPath(backendUrl.logout), logoutDto).pipe(
      map(response=>{
        this._store.dispatch(AuthAction.removeUserOnLogout())
        this._store.dispatch(FlashMessageAction.addMessageToList({flashMessage: new FlashMessage(response.responseMessage, false)}));
        this._storageService.deleteItem(APP_CONSTANTS.USER);
        return response;
      })
    )
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
   * Modification mot de passe perdu
   * @param changeLostPassworddto
   */
  reinitializeLostPassword(reinitializeLostPasswordDto: IReinitializeLostPasswordDto): Observable<IResponseDto>{
    return this._http.post<IResponseDto>(this.apiPath(backendUrl.reinitializeLostPassword), reinitializeLostPasswordDto).pipe(
      map(response=>{
        this._store.dispatch(FlashMessageAction.addMessageToList({ flashMessage: new FlashMessage(response.responseMessage, false)}));
        return response;
      }),
      catchError(error => {
        const errorMessage: string = error.error.error;
        this._store.dispatch(FlashMessageAction.addMessageToList({ flashMessage: new FlashMessage(errorMessage, true)}));
        return of({} as IResponseDto);
      })
    )
  }

  /**
   * Confirmation inscription professionel
   * @param professionalRegisterConfirmationDto
   * @returns IResponseDto
   */
  professionalRegisterConfirmation(professionalRegisterConfirmationDto: IProfessionalRegisterConfirmationDto): Observable<IResponseDto> {
    return this._http.post<IResponseDto>(this.apiPath(backendUrl.professionalRegisterConfirmation), professionalRegisterConfirmationDto).pipe(
      map(response=>{
        this._store.dispatch(FlashMessageAction.addMessageToList({ flashMessage: new FlashMessage(response.responseMessage, false)}));
        return response;
      }),
      catchError(error => {
        const errorMessage: string = error.error.error;
        this._store.dispatch(FlashMessageAction.addMessageToList({ flashMessage: new FlashMessage(errorMessage, true)}));
        return of({} as IResponseDto);
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
