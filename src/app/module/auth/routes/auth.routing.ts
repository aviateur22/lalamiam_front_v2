//@ts-nocheck
import { Route } from "@angular/router";
import { LoginPageComponent } from "../pages/login-page/login-page.component";
import { RegisterPageComponent } from "../pages/register-page/register-page.component";
import { environment } from "src/environments/environment";
import pageTitle from "src/misc/page-title";
import frontendLinkUrl from "src/misc/frontend.url";
import { AccountActivationPageComponent } from "../pages/account-activation-page/account-activation-page.component";
import { ChangePasswordPageComponent } from "../pages/change-password-page/change-password-page.component";
import { ReinitializePasswordLostPageComponent } from "../pages/reinitialize-password-lost-page/reinitialize-password-lost-page.component";
import { UserRegisterAsProfessionalComponent } from "../pages/user-register-as-professional/user-register-as-professional.component";
import { LostPasswordPageComponent } from "../pages/lost-password-page/lost-password-page.component";
import { titleResolver } from "src/app/module/common/service/title.resolver";
import { RegisterProfessionalPageComponent } from "../pages/register-professional-page/register-professional-page.component";
import { ProfessionalRegisterConfirmationPageComponent } from "../pages/professional-register-confirmation-page/professional-register-confirmation-page.component";

export const authRouting: Route[] = [
    { path: frontendLinkUrl.login.url, component: LoginPageComponent, resolve:{ title: titleResolver}},
    { path: frontendLinkUrl.register.url, component: RegisterPageComponent, resolve:{ title: titleResolver}},
    { path: frontendLinkUrl.accountActivation.url, component: AccountActivationPageComponent, resolve:{ title: titleResolver}},
    { path: frontendLinkUrl.changePassword.url, component: ChangePasswordPageComponent, resolve:{ title: titleResolver}},
    { path: frontendLinkUrl.lostPasswordMailingPage.url, component: LostPasswordPageComponent, resolve:{ title: titleResolver}},
    { path: frontendLinkUrl.professionalRegister.url, component: RegisterProfessionalPageComponent, resolve:{ title: titleResolver}},
    { path: frontendLinkUrl.professionalRegisterConfirmation.url, component: ProfessionalRegisterConfirmationPageComponent, resolve: { title: titleResolver}},
    { path: frontendLinkUrl.changeLostAccountPassword.url, component: ReinitializePasswordLostPageComponent, resolve: {title: titleResolver}}
]
