import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserHomePageComponent } from './pages/user-home-page/user-home-page.component';
import { userRouting } from './routes/user.routing';



@NgModule({
  declarations: [
    UserHomePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(userRouting)
  ]
})
export class UserModule { }
