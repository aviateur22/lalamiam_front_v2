import { Component, Input } from '@angular/core';
import { FlashMessage } from '../../model/common.model';

@Component({
  selector: 'app-flash-message',
  templateUrl: './flash-message.component.html',
  styleUrls: ['./flash-message.component.css']
})
export class FlashMessageComponent {
  @Input() flashMessage!: FlashMessage;
  @Input() index!: number;
}
