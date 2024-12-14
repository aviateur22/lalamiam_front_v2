import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './module/auth/auth.module';
import { InitModule } from './module/init/init.module';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from 'src/store/app.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { HandlerHttpInterceptor } from 'src/app/interceptor/http.interceptor';
import { HeaderParameterService } from './interceptor/services/header.parameter.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    InitModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly:! environment.production})
  ],
  providers: [
    HeaderParameterService,
    {
      provide: HTTP_INTERCEPTORS, useClass: HandlerHttpInterceptor,multi: true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
