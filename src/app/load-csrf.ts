import { Injectable } from "@angular/core";
import { AuthService } from "./module/auth/services/auth.service";
import { AppParamService } from "./module/init/services/app-param.service";

@Injectable({
  providedIn: "root"
})
export abstract class LoadCsrf {

   // Properiete
   properties: any;

  constructor(private authService: AuthService, private appParam: AppParamService) {
    this.loadCsrf();
    this.loadProperties();
  }

  /**
   * Chargement du Token CSRF pour l'utilisation dans des formulaire
   */
  async loadCsrf() {
    await this.authService.getCsrfToken();
  }

  /**
   * Chargement des fichiers propriétés
   */
  async loadProperties() {
    this.properties = this.appParam.getProperties();
  }
}
