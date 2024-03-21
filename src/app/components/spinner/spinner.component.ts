import { Component, Input } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
})
export class SpinnerComponent {
  isLoading = false;

  constructor(private spinnerService: SpinnerService) {}
  ngOnInit() {
    this.spinnerService.getSpinnerVisible().subscribe((visible) => {
      this.isLoading = visible;
    });
  }
}
