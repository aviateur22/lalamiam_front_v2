import { Injectable } from "@angular/core";
import { IProfessionalToActivateDto } from "../models/admin.dto";
import { ProfessionalToActivate } from "../models/admin.model";

@Injectable({
  providedIn: "root"
})
export class ProfessionalToActivateMapper {
  public mapToProfessionalToActivate(data: IProfessionalToActivateDto): ProfessionalToActivate {
    return new ProfessionalToActivate(data.professionalEmail, data.accountCreatedAt, data.id);
  }
}
