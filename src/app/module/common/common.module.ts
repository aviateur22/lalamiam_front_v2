import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { FlashMessageContainerComponent } from './components/fash_message/flash-message-container/flash-message-container.component';
import { FlashMessageComponent } from './components/fash_message/flash-message/flash-message.component';
import { ErrorPageComponent } from './page/error-page/error-page.component';
import { HomePageComponent } from './page/home-page/home-page.component';
import { NotFoundPageComponent } from './page/not-found-page/not-found-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { StorageService } from './service/storage.service';
import { reducers as flashMessageReducers} from './store/flash-message.reducer'
import { CommonEffect } from './store/effect';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { commonRooting } from './routes/common.routing';
import { RouterModule } from '@angular/router';

import { MessageModule } from 'primeng/message';

@NgModule({
  declarations: [
    FlashMessageComponent,
    FlashMessageContainerComponent,
    ErrorPageComponent,
    HomePageComponent,
    NotFoundPageComponent,
    NavbarComponent
  ],
  imports: [
    MessageModule,
    AngularCommonModule,
    RouterModule.forChild(commonRooting),
    StoreModule.forFeature('flashMessageState', flashMessageReducers),
    EffectsModule.forFeature([
      CommonEffect
    ])
  ], exports:[
    FlashMessageContainerComponent,
    NavbarComponent
  ], providers: [
    StorageService
  ]
})
export class CommonModule { }
