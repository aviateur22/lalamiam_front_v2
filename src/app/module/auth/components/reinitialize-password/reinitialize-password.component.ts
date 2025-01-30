import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reinitialize-password',
  templateUrl: './reinitialize-password.component.html',
  styleUrls: ['./reinitialize-password.component.css']
})
export class ReinitializePasswordComponent {
   // Properties contenant les données du formulaire
    @Input() properties: any;
    @Input() fg: FormGroup = new FormGroup({});

}
