import { Route } from "@angular/router";
import frontendUrl from "src/misc/frontend.url";

import { DisplayProfessionalToActivateListPageComponent } from "../pages/display-professional-to-activate-list-page/display-professional-to-activate-list-page.component";
import { ProfessionalToActivateDetailPageComponent } from "../pages/professional-to-activate-detail-page/professional-to-activate-detail-page.component";
import { titleResolver } from "../../common/service/title.resolver";

export const adminRouting: Route[] = [
  {path: frontendUrl.adminDisplayProfessionalToActivatePage.url, component: DisplayProfessionalToActivateListPageComponent, resolve:{ title: titleResolver}},
  {path: frontendUrl.adminDisplayProfessionalToActivateDetailPage.url, component: ProfessionalToActivateDetailPageComponent, resolve:{ title: titleResolver}}
]
