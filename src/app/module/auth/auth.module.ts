import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { authRouting } from './routes/auth.routing';
import { reducers as authReducer } from './store/reducer';
import { AuthEffect} from './store/effect';
import { AuthService } from './services/auth.service';
import { ShowOnFocusDirective } from './directives/show-on-focus.directive';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';
import { AccountActivationPageComponent } from './pages/account-activation-page/account-activation-page.component';
import { ChangePasswordPageComponent } from './pages/change-password-page/change-password-page.component';
import { LostPasswordPageComponent } from './pages/lost-password-page/lost-password-page.component';
import { CaptchaComponent } from './components/captcha/captcha.component';
import { RegisterProfessionalPageComponent } from './pages/register-professional-page/register-professional-page.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfessionalRegisterConfirmationPageComponent } from './pages/professional-register-confirmation-page/professional-register-confirmation-page.component';
import { ReinitializePasswordLostPageComponent } from './pages/reinitialize-password-lost-page/reinitialize-password-lost-page.component';
import { ReinitializePasswordComponent } from './components/reinitialize-password/reinitialize-password.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    AccountActivationPageComponent,
    ChangePasswordPageComponent,
    LostPasswordPageComponent,
    CaptchaComponent,
    RegisterProfessionalPageComponent,
    RegisterComponent,
    ProfessionalRegisterConfirmationPageComponent,
    ReinitializePasswordLostPageComponent,
    ReinitializePasswordComponent,
    ShowOnFocusDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forChild(authRouting),
    StoreModule.forFeature('authState', authReducer),
    EffectsModule.forFeature([
      AuthEffect
    ]),
    InputTextModule,
    PasswordModule,
    MessagesModule,
    ButtonModule,
    MessageModule,
    DividerModule,
    SkeletonModule
  ],
  providers: [AuthService]
})
export class AuthModule { }
