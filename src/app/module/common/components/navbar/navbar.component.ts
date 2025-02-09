import { Component, HostListener } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { IAppState } from 'src/store/state';
import { getUserEmail } from 'src/app/module/auth/store/selector';
import { getUser } from '../../store/selector';
import { EmailState } from 'src/app/module/auth/models/auth.model';
import frontendUrl from 'src/misc/frontend.url';
import { StorageService } from '../../service/storage.service';
import { AuthService } from 'src/app/module/auth/services/auth.service';
import { ILogoutDto } from 'src/app/module/auth/models/auth-dto.';
import { LoadCsrf } from 'src/app/load-csrf';
import { AppParamService } from 'src/app/module/init/services/app-param.service';
import { UserStatusService as UserStatusService } from '../../service/user.status.service';
import { UserRoles } from '../../model/common.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent extends LoadCsrf {
  // Email de l'utilisateur si connecté
  userEmail$: Observable<EmailState | null>;

  user$: Observable<UserRoles | null>;

  loginLink = `${frontendUrl.login.url}`;
  createClientLink = `${frontendUrl.register.url}`;
  createProfessionalLink = `${frontendUrl.professionalRegister.url}`;
  clientCreateProfessionalAccountLink = `${frontendUrl.userRegisterAsProfessional.url}`

  // Visibilité de la fenetre de confirmation de logout
  isLogoutVisible: boolean = false;

  // Visibilité du menu
  isMenuVisible:boolean = false;

  constructor(
    private _store: Store<IAppState>,
    private _storageService: StorageService,
    private _authService: AuthService,
    private _appParam: AppParamService,
    private _userStatusService: UserStatusService){
    super(_authService, _appParam);

    // Store
    this.user$ = this._store.pipe(select(getUser));
    this.userEmail$ = this._store.pipe(select(getUserEmail));
  }

  ngOnInit() {
    // Récupération de l'adresse email
    this.userEmail$.pipe(
      map(emailState => emailState?.email)
    ).subscribe(email => {
      if (email) {
        this.clientCreateProfessionalAccountLink = `/auth/user-email/${email}/user-create-professional-account`;
      }
    });
  }

  /**
   * Ecoute de l'event Resize
   * @param event
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkWidth();
  }

  /**
   * Toggle LogoutOverlay
  */
  displayLogoutOverlay() {
    this.isLogoutVisible = !this.isLogoutVisible;
  }

  /**
   * Toggle MenuOverlay
   */
  displayMenuOverlay() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  /**
   * Déconexion
   */
  logout() {
    console.log("ii")
    const userString = this._storageService.getItem('user');
            if(userString) {
              console.log("ici, userinfo: " + userString);
              const user = JSON.parse(userString);
              const logoutDto: ILogoutDto = {
                email: user.email,
                userId: user.userId
              }
              this._authService.logout(logoutDto).subscribe({
                next:result=>{
                  console.log(result)
                }
              });
            }

    this.displayLogoutOverlay();
  }

  /**
   * Vérification de la visibilité du menu
   */
  checkWidth() {
    if (window.innerWidth > 768 && this.isMenuVisible) {
      this.isMenuVisible = false;
    }
  }

}
