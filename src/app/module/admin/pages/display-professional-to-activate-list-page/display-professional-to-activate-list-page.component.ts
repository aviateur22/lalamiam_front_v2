import { Component } from '@angular/core';
import { LoadCsrf } from 'src/app/load-csrf';
import { AuthService } from 'src/app/module/auth/services/auth.service';
import { AppParamService } from 'src/app/module/init/services/app-param.service';
import { AdminService } from '../../services/admin.service';
import { Observable } from 'rxjs';
import { ProfessionalToActivate } from '../../models/admin.model';
import { select, Store } from '@ngrx/store';
import { IAppState } from 'src/store/state';
import { getIsLoadingSelector, getProfessionalsToActivateSelector } from '../../store/selector';
import { getProfessionalToActivateList } from '../../store/action';

@Component({
  selector: 'app-display-professional-to-activate-list-page',
  templateUrl: './display-professional-to-activate-list-page.component.html',
  styleUrls: ['./display-professional-to-activate-list-page.component.css']
})
export class DisplayProfessionalToActivateListPageComponent extends LoadCsrf {
  isLoading$: Observable<Boolean>;
  professionals$: Observable<ProfessionalToActivate[]>;

  constructor(private _authService: AuthService, private _appParam: AppParamService, private _adminbService: AdminService, private _store: Store<IAppState>) {
    super(_authService, _appParam);

    this.isLoading$ = this._store.pipe(select(getIsLoadingSelector));
    this.professionals$ = this._store.pipe(select(getProfessionalsToActivateSelector));
  }

  ngOnInit() {
    this._store.dispatch(getProfessionalToActivateList());
  }

}
