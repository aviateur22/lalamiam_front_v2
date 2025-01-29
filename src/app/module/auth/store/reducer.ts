import { createReducer, on } from "@ngrx/store";
import { IAuthModel } from "./auth.model";
import { addUserOnLoginSuccess, addUserOnRefresh, removeUserOnLogout } from "./action";

export const initialState: IAuthModel = {
  userEmail: null
}

export const reducers = createReducer(
  initialState,
  on(addUserOnLoginSuccess, (state, {userEmail})=> ({...state, userEmail})),
  on(addUserOnRefresh,(state, {userEmail})=>({...state, userEmail})),
  on(removeUserOnLogout,(state)=>({...state, userEmail:null}))
)
