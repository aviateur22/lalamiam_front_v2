import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Captcha } from '../../models/auth.model';
import { FormGroup } from '@angular/forms';
import { AppParamService } from 'src/app/module/init/services/app-param.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent {
  properties: any;
  @Input() fg: FormGroup = new FormGroup({});
  captcha$: Observable<Captcha|null> = of(null);

constructor(private _authService: AuthService, private _appParamService: AppParamService) {
}

  ngOnInit() {
    this.properties = this._appParamService.getProperties();
    this.captcha$ = this._authService.getCaptcha();
  }
}
