import { ActionReducerMap } from "@ngrx/store";
import { IAuthModel } from "src/app/module/auth/store/auth.model";
import { IAdminState } from "src/app/module/admin/store/state";

import { reducers as FlashMessageReducers } from "../app/module/common/store/flash-message.reducer";
import { reducers as AuthReducers } from "./../app/module/auth/store/reducer";
import {reducers as AdminReducer } from "./../app/module/admin/store/reducer";
import { IFlashMessageModel } from "src/app/module/common/store/common.model";

export interface IAppState {
  authState: IAuthModel,
  flashMessageState:  IFlashMessageModel,
  adminState: IAdminState
}

export const reducers: ActionReducerMap<IAppState> = {
  flashMessageState: FlashMessageReducers,
  authState: AuthReducers,
  adminState: AdminReducer
}
