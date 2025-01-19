import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { FlashMessageContainerComponent } from './fash_message/flash-message-container/flash-message-container.component';
import { FlashMessageComponent } from './fash_message/flash-message/flash-message.component';

import { reducers as flashMessageReducers} from './store/flash-message.reducer'
import { CommonEffect } from './store/effect';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    FlashMessageComponent,
    FlashMessageContainerComponent
  ],
  imports: [
    AngularCommonModule,
    StoreModule.forFeature('flashMessageState', flashMessageReducers),
    EffectsModule.forFeature([
      CommonEffect
    ])
  ], exports:[
    FlashMessageContainerComponent
  ]
})
export class CommonModule { }
