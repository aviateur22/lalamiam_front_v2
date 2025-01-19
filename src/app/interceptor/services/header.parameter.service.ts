import { HttpRequest } from "@angular/common/http";
import backendUrl from "src/misc/backend.url";
import { APP_CONSTANTS } from "../../../misc/constant";
import { LogUtility } from "src/utils/log.utility";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

/**
 * Mise à jour des headers a envoyer à l'API en fonction du API path
 */
@Injectable({
  providedIn: "root"
})
export class HeaderParameterService {

  set(request: HttpRequest<unknown>): HttpRequest<unknown> {
    LogUtility.log(HeaderParameterService.name, `backendPath ${request.url}`)
    switch(request.url) {
      case environment.api_base + backendUrl.appInit: return this.headerAppInitialize(request);
      case environment.api_base + backendUrl.register:
      case environment.api_base + backendUrl.professionalRegister:
      case environment.api_base + backendUrl.login:
      case environment.api_base + backendUrl.captcha:
      case environment.api_base + backendUrl.csrf: return this.headerPostNoBearer(request)
      default: return request;
    }
  }


  /**
   *
   * @param request
   * @returns
   */
  private headerAppInitialize(request: HttpRequest<unknown>): HttpRequest<unknown>  {
    LogUtility.log(HeaderParameterService.name, request.url)

    return request.clone({
      withCredentials: true,
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Header avec token JWT
   * @param request HttpRequest
   * @returns HttpRequest
   */
  private headerPostWithBearer(request: HttpRequest<unknown>): HttpRequest<unknown>  {
    let token: string | undefined = undefined;

    const user = localStorage.getItem('user');
    LogUtility.log(HeaderParameterService.name, `Données utilisateur : ${user}`)

    if(user) {
      const { jwt: token } = JSON.parse(user);
      LogUtility.log(HeaderParameterService.name, `user login jwt: ${token}`);
    }


    return request.clone({
      withCredentials: true,
      setHeaders: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Post-Csrf-Token': localStorage.getItem(APP_CONSTANTS.POST_CSRF_TOKEN) ?? ''
      }
    });
  }

  /**
   * Header sans Token JWT
   * @param request HttpRequest
   * @returns HttpRequest
   */
  private headerPostNoBearer(request: HttpRequest<unknown>): HttpRequest<unknown>  {
    LogUtility.log(HeaderParameterService.name, "headerPostNoBearer");
      LogUtility.log(HeaderParameterService.name, `Token CSRF: ${localStorage.getItem(APP_CONSTANTS.POST_CSRF_TOKEN)?? ''}`)

    return request.clone({
      withCredentials: true,
      setHeaders: {
        'Post-Csrf-Token': localStorage.getItem(APP_CONSTANTS.POST_CSRF_TOKEN)?? '',
        'Content-Type': 'application/json'
      }
    });
  }
}
