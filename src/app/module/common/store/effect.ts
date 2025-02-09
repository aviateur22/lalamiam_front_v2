import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects";
import * as CommonAction from "./action";
import { catchError, delay, map, of, switchMap, tap } from "rxjs";
import { LogUtility } from "src/utils/log.utility";
import { StorageService } from "../service/storage.service";

@Injectable()
export class CommonEffect {

  constructor(private _action$: Actions, private _storageService: StorageService){}

  addFlashMessage$ = createEffect(()=>
    this._action$.pipe(
      ofType(CommonAction.addMessageToList),
      tap(
        action=> LogUtility.log(CommonEffect.name, `nouveau message: ${action.flashMessage.message}`),
      ),
      delay(5000),
      map(()=>CommonAction.removeMessageFromList())
    )
  )

  removeFlashMessage$ = createEffect(()=>
    this._action$.pipe(
      ofType(CommonAction.removeMessageFromList),
      tap(
        action=> LogUtility.log(CommonEffect.name, `suppression de 1 message`)
      )

    ), {dispatch: false}

  )
}
