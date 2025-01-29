import { EmailState } from "../models/auth.model";

export interface IAuthModel {
  userEmail: EmailState | null;
}
