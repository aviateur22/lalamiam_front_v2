import { createAction, props } from "@ngrx/store";
import { EmailState } from "../models/auth.model";

export const addUserOnLoginSuccess = createAction('[Auth add user on login success] add user email', props<{userEmail: EmailState}>());
export const removeUserOnLogout = createAction('[Auth remove user] remove user email');
export const addUserOnRefresh = createAction('[Auth] add user on refresh', props<{userEmail:EmailState}>());

