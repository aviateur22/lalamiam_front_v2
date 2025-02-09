import { ActionReducerMap } from "@ngrx/store";
import { IAuthModel } from "src/app/module/auth/store/auth.model";
import { IAdminState } from "src/app/module/admin/store/state";
import { ICommonState } from "src/app/module/common/store/state";

import { reducers as CommonReducers } from "../app/module/common/store/reducer";
import { reducers as AuthReducers } from "./../app/module/auth/store/reducer";
import {reducers as AdminReducer } from "./../app/module/admin/store/reducer";

export interface IAppState {
  authState: IAuthModel,
  commonState  : ICommonState,
  adminState: IAdminState
}

export const reducers: ActionReducerMap<IAppState> = {
  commonState: CommonReducers,
  authState: AuthReducers,
  adminState: AdminReducer
}
