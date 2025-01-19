import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { applicationInitialize } from './func/application.initialize';
import { AppParamService } from './services/app-param.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ], providers: [
    AppParamService,
    {
      provide: APP_INITIALIZER,
      useFactory: applicationInitialize,
      deps:[AppParamService],
      multi: true
    }
  ]
})
export class InitModule { }
