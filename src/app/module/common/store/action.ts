import { createAction, props } from "@ngrx/store";
import { FlashMessage, UserRoles } from "../model/common.model";

export const addMessageToList = createAction('[Common add flash message] add message to list', props<{ flashMessage: FlashMessage }>());
export const removeMessageFromList = createAction('[Common remove flash message] remove message from list');
export const userLoginAuthenticatedAction = createAction('[Common user authenticate action] user is login', props<{userRoles: UserRoles}>());
export const userLogoutAuthenticatedAction = createAction('[Common user authenticate action] user is logout', props<{userRoles: UserRoles}>());
