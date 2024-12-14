//@ts-nocheck
import { Route } from "@angular/router";
import { LoginPageComponent } from "../pages/login-page/login-page.component";
import { RegisterPageComponent } from "../pages/register-page/register-page.component";
import { environment } from "src/environments/environment";
import pageTitle from "src/misc/page-title";
import frontendLinkUrl from "src/misc/frontend.url";
import { AccountActivationPageComponent } from "../pages/account-activation-page/account-activation-page.component";
import { ChangePasswordPageComponent } from "../pages/change-password-page/change-password-page.component";
import { LostPasswordPageComponent } from "../pages/lost-password-page/lost-password-page.component";

export const authRouting: Route[] = [
  {
    path: environment.webapp_path,
    children: [
      { path: frontendLinkUrl.login.url, component: LoginPageComponent, title: pageTitle.loginPageTitle[environment.language]},
      { path: frontendLinkUrl.register.url, component: RegisterPageComponent, title: pageTitle.registerPageTitle[environment.language]},
      { path: frontendLinkUrl.accountActivation.url, component: AccountActivationPageComponent, title: pageTitle.activateAccountTitle[environment.language]},
      { path: frontendLinkUrl.changeAccountPassword.url, component: ChangePasswordPageComponent, title: pageTitle.changeAccountPasswordTitle[environment.language]},
      { path: frontendLinkUrl.lostPasswordMailingPage.url, component: LostPasswordPageComponent, title: pageTitle.lostPasswordMailingTitle[environment.language]}
    ]

  }
]
