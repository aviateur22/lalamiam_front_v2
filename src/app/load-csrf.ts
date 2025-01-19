import { AuthService } from "./module/auth/services/auth.service";

export abstract class LoadCsrf {

  constructor(private authService: AuthService) {
    this.loadCsrf();
  }

  /**
   * Chargement du Token CSRF
   */
  async loadCsrf() {
    await this.authService.getCsrfToken();
  }
}
