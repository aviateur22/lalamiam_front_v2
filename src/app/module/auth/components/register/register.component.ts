import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppParamService } from 'src/app/module/init/services/app-param.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Properties contenant les données du formulaire
  @Input() properties: any;
  @Input() fg: FormGroup = new FormGroup({});

}
