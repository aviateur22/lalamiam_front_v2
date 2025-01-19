import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { firstValueFrom } from 'rxjs';

import { environment } from 'src/environments/environment';
import backendUrl from 'src/misc/backend.url';
import { IAppParameter } from '../models/app.init.dto';
import { LogUtility } from 'src/utils/log.utility';
import { PropertiesLanguage } from 'src/app/model/properties-language';

@Injectable({
  providedIn: 'root'
})
export class AppParamService {

  properties: any;

  constructor(private _http: HttpClient) { }

  /**
   * Récupération des parametres API
   * - Language Api
   * - Cookie pour generer des tokens CSRF
   * - Cookie pour generer des captchas
   * - Chargement du fichier propriété
   */
  async appInit() {
    const { language }  = await firstValueFrom(this._http.get<IAppParameter>(environment.api_base + backendUrl.appInit));
    this.properties = await firstValueFrom(this.loadProperties(language));
    environment.language = language ?? environment.language;
    LogUtility.log( AppParamService.name,`environment.language: ${environment.language}`)

  }

  public getProperties() {
    return this.properties;
  }

  /**
   * Chargement des propriétés du front
   * @param language string - Language
   * @returns any
   */
  private loadProperties(language: string) {
    let path: string;
    LogUtility.log( AppParamService.name,`language de API: ${language}`)
    switch(language) {
      case 'en': path = PropertiesLanguage.EN; break;
      case 'fr': path = PropertiesLanguage.FR; break;
      default: path = PropertiesLanguage.FR;
    }

    LogUtility.log( AppParamService.name,`path fichier de propriété: ${path}`)
    return this._http.get<any>(path);
  }
}
