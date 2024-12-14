import { HttpRequest } from "@angular/common/http";
import backendUrl from "src/misc/backend.url";
import { APP_CONSTANTS } from "../../constant";
import { LogUtility } from "src/utils/log.utility";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class HeaderParameterService {

  set(request: HttpRequest<unknown>): HttpRequest<unknown> {
    switch(request.url) {
      case environment.api_base + backendUrl.appInit: return this.headerAppInitialize(request);
      case
      environment.api_base + backendUrl.register,
      environment.api_base + backendUrl.login: return this.headerPostNoBearer(request)
      default: return request;
    }
  }


  /**
   *
   * @param request
   * @returns
   */
  private headerAppInitialize(request: HttpRequest<unknown>): HttpRequest<unknown>  {
    LogUtility.log(request.url)

    return request.clone({
      withCredentials: true,
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   *
   * @param request
   * @returns
   */
  private headerPostWithBearer(request: HttpRequest<unknown>): HttpRequest<unknown>  {
    let token: string | undefined = undefined;

    const user = localStorage.getItem('user');
    LogUtility.log(`Données utilisateur : ${user}`)

    if(user) {
      const { jwt: token } = JSON.parse(user);
      LogUtility.log(`user login jwt: ${token}`);
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
   *
   * @param request
   * @returns
   */
  private headerPostNoBearer(request: HttpRequest<unknown>): HttpRequest<unknown>  {
    return request.clone({
      withCredentials: true,
      setHeaders: {
        'Content-Type': 'application/json',
        'Post-Csrf-Token': localStorage.getItem(APP_CONSTANTS.POST_CSRF_TOKEN) ?? ''
      }
    });
  }
}
