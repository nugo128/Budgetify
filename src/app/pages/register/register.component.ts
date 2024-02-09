import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      repeatPassword: [''],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log(formData);
      this.http
        .post('http://127.0.0.1:8000/api/signup', formData)
        .subscribe((responseData) => {
          console.log(responseData);
          localStorage.setItem('token', responseData['token']);
          this.router.navigate(['/main']);
        });
    }
  }
}
