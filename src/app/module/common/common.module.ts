import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { FlashMessageContainerComponent } from './components/fash_message/flash-message-container/flash-message-container.component';
import { FlashMessageComponent } from './components/fash_message/flash-message/flash-message.component';
import { ErrorPageComponent } from './page/error-page/error-page.component';
import { HomePageComponent } from './page/home-page/home-page.component';
import { NotFoundPageComponent } from './page/not-found-page/not-found-page.component';

import { StorageService } from './service/storage.service';
import { reducers as flashMessageReducers} from './store/flash-message.reducer'
import { CommonEffect } from './store/effect';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { commonRooting } from './routes/common.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FlashMessageComponent,
    FlashMessageContainerComponent,
    ErrorPageComponent,
    HomePageComponent,
    NotFoundPageComponent
  ],
  imports: [
    AngularCommonModule,
    RouterModule.forChild(commonRooting),
    StoreModule.forFeature('flashMessageState', flashMessageReducers),
    EffectsModule.forFeature([
      CommonEffect
    ])
  ], exports:[
    FlashMessageContainerComponent
  ], providers: [
    StorageService
  ]
})
export class CommonModule { }
