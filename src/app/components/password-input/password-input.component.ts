import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true,
    },
  ],
})
export class PasswordInputComponent implements ControlValueAccessor {
  showPassword: boolean = false;
  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: any): void {
    this.showPassword = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.onChange(this.showPassword);
    this.onTouch();
  }

  @Input() placeholderText = '';
}
