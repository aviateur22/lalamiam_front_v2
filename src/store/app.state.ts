import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from "./state";
import { reducers as AuthReducers } from "src/app/module/auth/store/reducer";

export const reducers: ActionReducerMap<IAppState> = {
  authState: AuthReducers
}
