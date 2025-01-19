import { createReducer, on } from "@ngrx/store";
import { addMessageToList, removeMessageFromList } from "./flash-message.action";
import { IFlashMessageModel } from "./common.model";
import { LogUtility } from "src/utils/log.utility";

export const initialStateFlashMessage: IFlashMessageModel = {
  flashMessages: []
}

export const reducers = createReducer(
  initialStateFlashMessage,
  on(addMessageToList,(state, {flashMessage}) => {
    console.log('tes', state.flashMessages);
    const newState = {...state, flashMessages: [flashMessage, ...state.flashMessages]};
    LogUtility.log('tes', newState)
    return newState
  }),
  on(removeMessageFromList, (state) =>({...state, flashMessages: state.flashMessages.filter((_, i)=> i!==state.flashMessages.length - 1)}))

)
