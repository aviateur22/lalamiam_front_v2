import { Route } from "@angular/router";
import frontendUrl from "src/misc/frontend.url";
import { titleResolver } from "../../common/service/title.resolver";

import { UserHomePageComponent } from "../pages/user-home-page/user-home-page.component";

export const userRouting: Route[] = [
  {path: frontendUrl.userHome.url, component: UserHomePageComponent,resolve:{title: titleResolver}}

]
