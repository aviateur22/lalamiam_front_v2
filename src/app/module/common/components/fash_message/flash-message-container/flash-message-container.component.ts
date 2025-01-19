import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FlashMessage } from '../../../model/common.model';
import { select, Store } from '@ngrx/store';
import { IAppState } from 'src/store/state';
import { getFlashMessages } from '../../../store/flash-message.selector';

@Component({
  selector: 'app-flash-message-container',
  templateUrl: './flash-message-container.component.html',
  styleUrls: ['./flash-message-container.component.css']
})
export class FlashMessageContainerComponent {

  flashMessages$: Observable<FlashMessage[]>;

  constructor(private _store: Store<IAppState>) {
    this.flashMessages$ = this._store.pipe(select(getFlashMessages));
    console.log(this.flashMessages$);

  }
}
