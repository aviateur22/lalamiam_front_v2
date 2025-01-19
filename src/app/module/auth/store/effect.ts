import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import * as AuthAction from "./action";
import { catchError, of, switchMap } from "rxjs";
import { LogUtility } from "src/utils/log.utility";

@Injectable()
export class AuthEffect {

  constructor(private _action$: Actions, private _authService: AuthService, private _router: Router){}

}
