import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-obligatory-component',
  templateUrl: './obligatory-component.component.html',
  styleUrl: './obligatory-component.component.css',
})
export class ObligatoryComponentComponent {
  @Input() title = '';
  @Input() date_to = 0;
  @Input() date_from = 0;
  @Input() amount = 0;

  formatDate(dateString: any): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US').replace(/\//g, '.');
  }
}
