import { createSelector } from "@ngrx/store";
import { IAppState } from "src/store/state";

export const selector = (state:IAppState) => state.flashMessageState;

export const getFlashMessages = createSelector(selector, (state) => state.flashMessages);
