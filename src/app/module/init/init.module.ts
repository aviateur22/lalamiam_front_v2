import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { applicationInitialize } from './func/application.initialize';
import { InitAppService } from './services/init-app.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ], providers: [
    InitAppService,
    {
      provide: APP_INITIALIZER,
      useFactory: applicationInitialize,
      deps:[InitAppService],
      multi: true
    }
  ]
})
export class InitModule { }
