import { createSelector } from "@ngrx/store";
import { IAppState } from "src/store/state";

export const selector = (state:IAppState) => state.commonState;
export const getFlashMessages = createSelector(selector, (state) => state.flashMessages);
export const getUser = createSelector(selector, (state)=>state.user);
