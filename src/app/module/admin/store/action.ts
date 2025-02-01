import { createAction, props } from "@ngrx/store";
import { ProfessionalToActivate } from "../models/admin.model";

export const getProfessionalToActivateList = createAction('[Admin getProfessionalToActivateList] get professional to activate list');
export const getProfessionalToActivateListSuccess = createAction('[Admin getProfessionalToActivateListSuccess] get professional to activate list success',  props<{professionals: ProfessionalToActivate[]}>());
