import { ActionReducerMap } from "@ngrx/store";
import { IAuthModel } from "src/app/module/auth/store/auth.model";

import { reducers as FlashMessageReducers } from "../app/module/common/store/flash-message.reducer";
import { reducers as AuthReducers } from "./../app/module/auth/store/reducer";
import { IFlashMessageModel } from "src/app/module/common/store/common.model";

export interface IAppState {
  authState: IAuthModel,
  flashMessageState:  IFlashMessageModel
}

export const reducers: ActionReducerMap<IAppState> = {
  flashMessageState: FlashMessageReducers,
  authState: AuthReducers
}
