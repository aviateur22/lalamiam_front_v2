import { FlashMessage, UserRoles } from "../model/common.model";

export interface ICommonState {
  user: UserRoles,
  flashMessages: FlashMessage[];
}
