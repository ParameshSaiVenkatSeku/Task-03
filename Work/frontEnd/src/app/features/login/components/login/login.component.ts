import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; // Import environment variables

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessages: { [key: string]: string } = {};

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      emailOrUsername: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
        ),
      ]),
    });
  }

  validateFieldOnBlur(fieldName: string): void {
    const field = this.loginForm.get(fieldName);
    if (field?.invalid && field?.touched) {
      this.errorMessages[fieldName] = this.getErrorMessage(
        fieldName,
        field.errors
      );
    } else {
      delete this.errorMessages[fieldName];
    }
  }

  clearErrorOnTyping(fieldName: string): void {
    const field = this.loginForm.get(fieldName);
    if (field?.valid) {
      delete this.errorMessages[fieldName];
    }
  }

  getErrorMessage(fieldName: string, errors: any): string {
    if (errors['required']) {
      return `${this.capitalize(fieldName)} is required.`;
    }
    if (errors['minlength']) {
      return `${this.capitalize(fieldName)} must be at least ${
        errors['minlength'].requiredLength
      } characters long.`;
    }
    if (errors['pattern']) {
      if (fieldName === 'password') {
        return `Password must include at least:
          - One uppercase letter
          - One lowercase letter
          - One digit
          - One special character`;
      }
    }
    return 'Invalid input.';
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('Form data:', formData);
      this.http
        .post(`${environment.apiUrl}/api/v1/login`, {
          usernameOrEmail: formData.emailOrUsername,
          password: formData.password,
        })
        .subscribe(
          (response: any) => {
            alert('User Log In Succesful!');
            console.log(response);
            // this.router.navigate(['/dashboard']);
          },
          (error) => {
            console.error('Error:', error);
          }
        );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  private capitalize(fieldName: string): string {
    return fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
  }
}
