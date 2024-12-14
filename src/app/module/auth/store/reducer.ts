import { createReducer } from "@ngrx/store";
import { IAuthModel } from "./auth.model";

export const initialState: IAuthModel = {
  error: '',
  isErrorVisible: false,
  isLoading: false,
  captcha: null,
  activateAccountResponse: null,
  changeAccountPassword: null
}

export const reducers = createReducer(
  initialState

)
