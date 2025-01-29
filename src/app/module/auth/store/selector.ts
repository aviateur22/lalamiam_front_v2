import { createSelector } from "@ngrx/store";
import { IAppState } from "src/store/state";

export const selector = (state:IAppState) => state.authState;

export const getUserEmail = createSelector(selector, (state) => state.userEmail);
