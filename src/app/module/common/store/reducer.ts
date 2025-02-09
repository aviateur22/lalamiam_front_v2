import { createReducer, on } from "@ngrx/store";
import { addMessageToList, removeMessageFromList, userLoginAuthenticatedAction, userLogoutAuthenticatedAction } from "./action";
import { ICommonState } from "./state";
import { UserRoles } from "../model/common.model";

export const initialCommonState: ICommonState = {
  flashMessages: [],
  user: new UserRoles(false, false, false, false, false)
}

export const reducers = createReducer(
  initialCommonState,
  on(addMessageToList,(state, {flashMessage}) => {
    const newState = {...state, flashMessages: [flashMessage, ...state.flashMessages]};
    return newState
  }),
  on(removeMessageFromList, (state) =>({...state, flashMessages: state.flashMessages.filter((_, i)=> i!==state.flashMessages.length - 1)})),
  on(userLoginAuthenticatedAction, (state, {userRoles})=>({...state, user:userRoles })),
  on(userLogoutAuthenticatedAction, (state,{userRoles})=>({...state, user: userRoles }))
)
