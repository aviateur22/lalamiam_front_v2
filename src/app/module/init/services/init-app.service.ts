import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { firstValueFrom } from 'rxjs';

import { environment } from 'src/environments/environment';
import backendUrl from 'src/misc/backend.url';
import { IAppParameter } from '../models/app.init.dto';
import { LogUtility } from 'src/utils/log.utility';

@Injectable({
  providedIn: 'root'
})
export class InitAppService {

  constructor(private _http: HttpClient) { }

  async appInit() {
    const { language }  = await firstValueFrom(this._http.get<IAppParameter>(environment.api_base + backendUrl.appInit))
    environment.language = language ?? environment.language;
    LogUtility.log(`language ihm ${environment.language}`)
  }
}
