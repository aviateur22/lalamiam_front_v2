import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginDto, ILoginResponseDto, ILogoutDto, IProfessionalRegisterConfirmationDto, IProfessionalRegisterDto, IRegisterDto, IRegisterResponseDto, IReinitializeLostPasswordDto } from '../models/auth-dto.';
import { catchError, firstValueFrom, map, Observable, of, tap, throwError } from 'rxjs';

import backendUrl from 'src/misc/backend.url';
import { EmailState } from '../models/auth.model';
import { captchaMapper } from '../models/map-to-model';

import { Store } from '@ngrx/store';
import { FlashMessage, UserRoles } from '../../common/model/common.model';
import { IAppState } from 'src/store/state';
import * as CommonActions from "../../common/store/action";
import * as AuthAction from './../store/action';

import { APP_CONSTANTS } from 'src/misc/constant';
import { StorageService } from 'src/app/module/common/service/storage.service';
import { IResponseDto } from 'src/app/model/response.dto';
import { UserStatusService } from '../../common/service/user.status.service';
import { ICaptchaDto } from 'src/app/model/captcha.dto';
import { Captcha } from 'src/app/model/captcha.model';
import { apiPath, getFormData } from 'src/app/helpers/service.helper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _storageService: StorageService,
    private _http: HttpClient,
    private _store: Store<IAppState>,
    private _userStatustService: UserStatusService) { }

  login(loginDto: ILoginDto):Observable<ILoginResponseDto> {

    return this._http.post<ILoginResponseDto>(apiPath(backendUrl.login), loginDto).pipe(
      map(loginResponse=>{
        this._store.dispatch(AuthAction.addUserOnLoginSuccess({ userEmail: new EmailState(loginResponse.email)}))
        this._store.dispatch(CommonActions.addMessageToList({ flashMessage: new FlashMessage(loginResponse.responseMessage, false)}))
        var userString = JSON.stringify({
          userId: loginResponse.id,
          email: loginResponse.email,
          jwt: loginResponse.jwt,
          roles: loginResponse.roles
        });

        // Mise a jour du statuts utilisateur
        this._store.dispatch(CommonActions.userLoginAuthenticatedAction({userRoles: this._userStatustService.setUserRoles(loginResponse.roles)}))

        // Sauvegarde des donnée utilisateur
        this._storageService.setItem(APP_CONSTANTS.USER, userString)
        return loginResponse

      }),
      catchError(error => {
        const errorMessage: string = error.error.error;
        this._store.dispatch(CommonActions.addMessageToList({ flashMessage: new FlashMessage(errorMessage, true)}))
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
    return this._http.post<IResponseDto>(apiPath(backendUrl.logout), logoutDto).pipe(
      map(response=>{
        this._store.dispatch(CommonActions.userLogoutAuthenticatedAction({ userRoles: new UserRoles( false, false,false,  false, false)}))
        this._store.dispatch(AuthAction.removeUserOnLogout());
        this._store.dispatch(CommonActions.addMessageToList({flashMessage: new FlashMessage(response.responseMessage, false)}));
        this._storageService.deleteItem(APP_CONSTANTS.USER);
        return response;
      })
    )
  }

  /**
   * Creation client
   * @param registerDto Dto
   * @returns Observable<IRegisterResponseDto>
   */
  register(registerDto: IRegisterDto): Observable<IRegisterResponseDto> {
      return this._http.post<ILoginResponseDto>(apiPath(backendUrl.register), registerDto).pipe(
        map(registerReponse=>{
          this._store.dispatch(CommonActions.addMessageToList({ flashMessage: new FlashMessage(registerReponse.responseMessage, false)}))
          return registerReponse
        }),
        catchError(error=>{
          const errorMessage: string = error.error.error;
          this._store.dispatch(CommonActions.addMessageToList({ flashMessage: new FlashMessage(errorMessage, true)}))
          return of({} as ILoginResponseDto);
        })
      );
  }

  /**
   * Création d'un compte professionel sans qua le personne ne soit déja client
   * @param professionalRegisterDto
   */
  professionalRegister(professionalRegisterDto: IProfessionalRegisterDto, file1: File, file2: File): Observable<IRegisterResponseDto> {

    // Convertion données en formData
    const formData: FormData = getFormData(professionalRegisterDto, file1, file2);

    return this._http.post<ILoginResponseDto>(apiPath(backendUrl.professionalRegister), formData).pipe(
      map(registerResponse=>{
        this._store.dispatch(CommonActions.addMessageToList({ flashMessage: new FlashMessage(registerResponse.responseMessage, false)}))
        return registerResponse
      }),
      catchError(error=>{
        const errorMessage: string = error.error.error;
        this._store.dispatch(CommonActions.addMessageToList({ flashMessage: new FlashMessage(errorMessage, true)}))
        return of({} as ILoginResponseDto);
      })
    )
  }


  /**
   * Modification mot de passe perdu
   * @param changeLostPassworddto
   */
  reinitializeLostPassword(reinitializeLostPasswordDto: IReinitializeLostPasswordDto): Observable<IResponseDto>{
    return this._http.post<IResponseDto>(apiPath(backendUrl.reinitializeLostPassword), reinitializeLostPasswordDto).pipe(
      map(response=>{
        this._store.dispatch(CommonActions.addMessageToList({ flashMessage: new FlashMessage(response.responseMessage, false)}));
        return response;
      }),
      catchError(error => {
        const errorMessage: string = error.error.error;
        this._store.dispatch(CommonActions.addMessageToList({ flashMessage: new FlashMessage(errorMessage, true)}));
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
    return this._http.post<IResponseDto>(apiPath(backendUrl.professionalRegisterConfirmation), professionalRegisterConfirmationDto).pipe(
      map(response=>{
        this._store.dispatch(CommonActions.addMessageToList({ flashMessage: new FlashMessage(response.responseMessage, false)}));
        return response;
      }),
      catchError(error => {
        const errorMessage: string = error.error.error;
        this._store.dispatch(CommonActions.addMessageToList({ flashMessage: new FlashMessage(errorMessage, true)}));
        return of({} as IResponseDto);
      })
    )
  }

  /**
   * Récupération token CSRF
   * @returns Promise<void>
   */
  async getCsrfToken(): Promise<void> {
   return firstValueFrom(this._http.get(apiPath(backendUrl.csrf), {observe: 'response'})).then(res=>{
   });
  }

  /**
   * Recupération du captcha
   * @returns Captcha
   */
  getCaptcha(): Observable<Captcha> {
    return this._http.get<ICaptchaDto>(apiPath(backendUrl.captcha)).pipe(
      tap(captchaDto=> this._storageService.setItem(APP_CONSTANTS.CAPTCHA_EXPECTED_RESPONSE, captchaDto.captchaResponseIdEncrypt)),
      map(captchaDto=>captchaMapper(captchaDto, captchaDto.captchaQuestionImageBase64))
    )
  }
}
