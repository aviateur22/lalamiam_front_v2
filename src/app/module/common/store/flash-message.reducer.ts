import { createReducer, on } from "@ngrx/store";
import { addMessageToList, removeMessageFromList } from "./flash-message.action";
import { IFlashMessageModel } from "./common.model";

export const initialStateFlashMessage: IFlashMessageModel = {
  flashMessages: []
}

export const reducers = createReducer(
  initialStateFlashMessage,
  on(addMessageToList,(state, {flashMessage}) => {
    const newState = {...state, flashMessages: [flashMessage, ...state.flashMessages]};
    return newState
  }),
  on(removeMessageFromList, (state) =>({...state, flashMessages: state.flashMessages.filter((_, i)=> i!==state.flashMessages.length - 1)}))

)
