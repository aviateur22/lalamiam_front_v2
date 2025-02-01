import { ProfessionalDetail, ProfessionalToActivate } from "../models/admin.model";


export interface IAdminState {
  professionalsToActivate: ProfessionalToActivate[],
  professionalDetail: ProfessionalDetail | null,
  isLoading: boolean
}
