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

      // Ajout CSRF TOKEN - format JSON
      case environment.api_base + backendUrl.register:
      case environment.api_base + backendUrl.professionalRegisterConfirmation:
      case environment.api_base + backendUrl.login:
      case environment.api_base + backendUrl.logout:
      case environment.api_base + backendUrl.captcha:
      case environment.api_base + backendUrl.reinitializeLostPassword:
      case environment.api_base + backendUrl.csrf: return this.headerPostNoBearer(request);

       // Ajout CSRF TOKEN - format MULTIPART
      case environment.api_base + backendUrl.professionalRegister: return this.headerPostNoBearerMulipartFormData(request);

      // Admin
      case environment.api_base + backendUrl.adminGetProfessionalToActivate: return this.headerPostWithBearerAndAdminToken(request);

      // Aucune surchage sur les parmetre de la requete
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

  /**
   * Header sans Token JWT et mulipartformdata pour l'envoie de document
   * @param request HttpRequest
   * @returns HttpRequest
   */
  private headerPostNoBearerMulipartFormData(request: HttpRequest<unknown>): HttpRequest<unknown>  {
    LogUtility.log(HeaderParameterService.name, "headerPostNoBearer");
      LogUtility.log(HeaderParameterService.name, `Token CSRF: ${localStorage.getItem(APP_CONSTANTS.POST_CSRF_TOKEN)?? ''}`)

    return request.clone({
      withCredentials: true,
      setHeaders: {
        'Post-Csrf-Token': localStorage.getItem(APP_CONSTANTS.POST_CSRF_TOKEN)?? ''
      }
    });
  }

  /**
   * Header avec JWT + Token ADMIN
   * @param request HttpRequest
   * @returns HttpRequest
   */
  private headerPostWithBearerAndAdminToken(request: HttpRequest<unknown>): HttpRequest<unknown>  {

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
