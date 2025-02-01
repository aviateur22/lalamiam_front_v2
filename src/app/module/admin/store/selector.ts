import { createSelector } from "@ngrx/store";
import { IAppState } from "src/store/state";

export const adminFeature = (state: IAppState) => state.adminState;
export const getIsLoadingSelector = createSelector(adminFeature, (state)=>state.isLoading);
export const getProfessionalsToActivateSelector = createSelector(adminFeature, (state)=>state.professionalsToActivate);
