import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, tap } from "rxjs";
import { EmailState } from "src/app/module/auth/models/auth.model";
import { AuthService } from "src/app/module/auth/services/auth.service";
import { StorageService } from "src/app/module/common/service/storage.service";
import * as AuthAction from "./../app/module/auth/store/action";
import * as CommonAction from "./../app/module/common/store/action"
import { Injectable } from "@angular/core";
import { UserStatusService } from "src/app/module/common/service/user.status.service";

@Injectable()
export class InitEffect {

  constructor(
    private _action$: Actions,
    private _storageService: StorageService,
    private _authService: AuthService,
    private _userStatusService: UserStatusService,
    private _router: Router){ console.log("✅ AuthEffects initialized!");}

  init$ = createEffect(()=>
    this._action$.pipe(
      ofType('@ngrx/effects/init'),
      tap(value=>{
        console.log(value);
      }),
      mergeMap(()=>{
        const userString = this._storageService.getItem('user');
        if(userString) {
          console.log("ici, userinfo: " + userString);
          const user = JSON.parse(userString);
          return [
            AuthAction.addUserOnRefresh({userEmail: new EmailState(user.email)}),
            CommonAction.userLoginAuthenticatedAction({userRoles:this._userStatusService.setUserRoles(user.roles)})
          ]
        }
        // Si pas de user de disponible
        return [AuthAction.removeUserOnLogout()];
      })
    )
  );
}
