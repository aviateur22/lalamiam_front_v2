import { createReducer, on } from "@ngrx/store";
import { IAdminState } from "./state";
import { getProfessionalToActivateList, getProfessionalToActivateListSuccess } from "./action";

export const initialState: IAdminState =  {
  professionalsToActivate: [],
  professionalDetail: null,
  isLoading: false
}

export const reducers = createReducer(
  initialState,
  on(getProfessionalToActivateList, (state)=>({...state, isLoading: true})),
  on(getProfessionalToActivateListSuccess, (state, {professionals})=>({...state, isLoading: false, professionalsToActivate: professionals}))
)
