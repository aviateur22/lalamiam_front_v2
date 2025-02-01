import { Component, Input } from '@angular/core';
import { ProfessionalToActivate } from '../../models/admin.model';
import { LoadCsrf } from 'src/app/load-csrf';
import { Router } from '@angular/router';
import { AppParamService } from 'src/app/module/init/services/app-param.service';
import { AuthService } from 'src/app/module/auth/services/auth.service';
import frontendUrl from 'src/misc/frontend.url';

@Component({
  selector: 'app-professonal-to-activate-resume',
  templateUrl: './professonal-to-activate-resume.component.html',
  styleUrls: ['./professonal-to-activate-resume.component.css']
})
export class ProfessonalToActivateResumeComponent extends LoadCsrf {

  constructor(private _authService: AuthService, private _appParam: AppParamService, private _router: Router){
    super(_authService, _appParam);
  }

  @Input() professional!: ProfessionalToActivate;

  displayDetail() {
    this._router.navigate([frontendUrl.adminDisplayProfessionalToActivateDetailPage.url.replace(':professional-email', this.professional.email)])
  }

}
