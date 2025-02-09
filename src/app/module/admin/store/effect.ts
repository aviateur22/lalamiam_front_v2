import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AdminAction from "./action";
import * as FlashMessageAction from "../../common/store/action";
import { AdminService } from "../services/admin.service";
import { catchError, map, mergeMap, of } from "rxjs";
import { Store } from "@ngrx/store";
import { IAppState } from "src/store/state";
import { HttpClient } from "@angular/common/http";
import { FlashMessage } from "../../common/model/common.model";
import { ProfessionalToActivateMapper } from "../mappers/model.mapper";

@Injectable()
export class AdminEffect {
  constructor(private _action$: Actions, private _adminService: AdminService, private _http: HttpClient){}

  getProfessionalListToActivate$ =  createEffect(()=>
    this._action$.pipe(
      ofType(AdminAction.getProfessionalToActivateList),
      mergeMap(()=>
        this._adminService.professionalToActivateList().pipe(
        map((professionals)=>AdminAction.getProfessionalToActivateListSuccess({professionals})
        ),
        catchError((error)=>{
          const errorMessage: string = error?.error?.error || 'error';
          return of(FlashMessageAction.addMessageToList(({ flashMessage: new FlashMessage(errorMessage, true)})))
        })
      ))
    )
  )
}
