import { Injectable } from "@angular/core";
import { UserRoles } from "../model/common.model";

@Injectable({
  providedIn: "root"
})
export class UserStatusService {

  private isClient: boolean = false;
  private isProfessional: boolean = false;
  private isAdmin: boolean = false;
  private isUserAuthenticated: boolean = false;
  private isEmployee: boolean = false;

  private user: UserRoles = new UserRoles(this.isAdmin, this.isProfessional, this.isClient, this.isUserAuthenticated, this.isEmployee);

  /**
   * Renvoie du statut du USER
   * @returns
   */
  public getUser(): UserRoles {
    return this.user;
  }

  /**
   * Initialisation du user
   * Method appelé a l'initialisation
   */

  initializeUser(): void {
    this.user = new UserRoles(this.isAdmin, this.isProfessional, this.isClient, this.isUserAuthenticated, this.isEmployee);
  }

  /**
   * MAJ des données utilisateur.
   * Methode appelé aprés connexion
   * @param {Partial<UserRoles>} roles - Données sur les roles disponible de l'utilisateur
   */
  userAuthenticated(roles: Partial<UserRoles>): void  {
    this.initializeUser();
    console.log(roles)
    this.user?.updateRoles(roles);
    console.log(this.user)
  }

  /**
   * Mise a jour des statuts de l'utilisateur
   * @param {string[]} roles - Liste des roles disponible pour l'utilisateur
   */
    public setUserRoles(roles: string[]): UserRoles  {

      let isAdmin = false;
      let isProfessional = false;
      let isEmployee = false;
      let  isAuthenticated = true;
      let isClient = true

      // si pas de role de disponible
      if(roles == null || roles.length == 0) {
        const userRoles: Partial<UserRoles> = {isAuthenticated: false, isAdmin: false, isClient: false, isProfessional: false, isEmployee: false}
        this.user.updateRoles(userRoles);
        return this.user;
      }

      roles.forEach(role=>{
        if(role.toLowerCase().includes("admin"))
          isAdmin = true;

        if(role.toLowerCase().includes("employee"))
          isEmployee = true;

        if(role.toLowerCase().includes("professional"))
          isProfessional = true;

        if(role.toLowerCase().includes("client"))
          isClient = true;

        if(role.toLowerCase().includes("professional"))
          isProfessional = true;
      })

      // Statut de isAuthenticated
      isAuthenticated = isClient || isEmployee || isProfessional || isAdmin;

      const userRoles: Partial<UserRoles> = {isAuthenticated, isAdmin, isClient, isProfessional, isEmployee}
      this.user.updateRoles(userRoles);
      return this.user;
    }
}
