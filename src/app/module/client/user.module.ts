import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '../auth/auth.module';
import { clientRouting } from './routes/client.routing';

import { UserHomePageComponent } from './pages/user-home-page/user-home-page.component';
import { ClientRegisterAsProfessionalPageComponent } from './pages/client-register-as-professional-page/client-register-as-professional-page.component';



@NgModule({
  declarations: [
    UserHomePageComponent,
    ClientRegisterAsProfessionalPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    RouterModule.forChild(clientRouting)
  ]
})
export class UserModule { }
