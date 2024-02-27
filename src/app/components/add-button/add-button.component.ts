import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.css',
})
export class AddButtonComponent {
  @Input() buttonText = '';
  @Input() width = null;
}
