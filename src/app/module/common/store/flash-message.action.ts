import { createAction, props } from "@ngrx/store";
import { FlashMessage } from "../model/common.model";

export const addMessageToList = createAction('[Common add flash message] add message to list', props<{ flashMessage: FlashMessage }>());

export const removeMessageFromList = createAction('[Common remove flash message] remove message from list');
