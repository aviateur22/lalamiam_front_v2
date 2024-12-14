import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import frontendLinkUrl from '../../misc/frontend.url';
import { LogUtility } from '../../utils/log.utility';
import { APP_CONSTANTS } from '../constant';
import { HeaderParameterService } from './services/header.parameter.service';


@Injectable()
export class HandlerHttpInterceptor implements HttpInterceptor {

  constructor(private _injector: Injector, private _headerParam: HeaderParameterService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    request = this._headerParam.set(request);

    return next.handle(request).pipe(
      tap(event=>{
        if(event instanceof HttpResponse) {
          const csrfToken = event.headers.get(APP_CONSTANTS.POST_CSRF_TOKEN);
          if (csrfToken) {
            localStorage.setItem(APP_CONSTANTS.POST_CSRF_TOKEN, csrfToken);
          }
        }
      }),
      tap({
        error: (error: HttpErrorResponse)=>{
          const errorStatus: number = error.status;
          const router = this._injector.get(Router);
          const webappPath: string = environment.webapp_path !== '' ?
          environment.webapp_path : '';
          switch(errorStatus) {
            case 0: {
              console.log('erreur: 0: ', error.status);
              router.navigate([`${webappPath}/${frontendLinkUrl.error.url}`]);
              break;
            }
            case 401: {
              console.log('erreur: 401: ', error.message);
              router.navigate([`${webappPath}/${frontendLinkUrl.login.url}`]);
              break;
            }
            case 403: {

              console.log('error 403: ', 'error 403');
              router.navigate([`${webappPath}/${frontendLinkUrl.login.url}`]);
              break;
            }
            case 404: {
              console.log('error 404: ', error.status);
              router.navigate([`${webappPath}/${frontendLinkUrl.notFound.url}`]);
             break;
            }
          }
        }
      })
    );
  }
}
