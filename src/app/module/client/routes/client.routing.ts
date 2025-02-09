import { Route } from "@angular/router";
import frontendUrl from "src/misc/frontend.url";
import { titleResolver } from "../../common/service/title.resolver";

import { UserHomePageComponent } from "../pages/user-home-page/user-home-page.component";
import { ClientRegisterAsProfessionalPageComponent } from "../pages/client-register-as-professional-page/client-register-as-professional-page.component";

export const clientRouting: Route[] = [
  {path: frontendUrl.userHome.url, component: UserHomePageComponent,resolve:{title: titleResolver}},
  { path: frontendUrl.userRegisterAsProfessional.url, component: ClientRegisterAsProfessionalPageComponent, resolve: {title: titleResolver}},
]
