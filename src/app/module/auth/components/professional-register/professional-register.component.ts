import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-professional-register',
  templateUrl: './professional-register.component.html',
  styleUrls: ['./professional-register.component.css']
})
export class ProfessionalRegisterComponent {
  // Properties contenant les données du formulaire
  @Input() properties: any;
  @Input() fg: FormGroup = new FormGroup({});
}
