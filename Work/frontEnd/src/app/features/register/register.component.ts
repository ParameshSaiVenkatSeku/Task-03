import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; // Import environment variables

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm!: FormGroup;
  errorMessages: { [key: string]: string } = {};

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]),
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
    const field = this.registerForm.get(fieldName);
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
    const field = this.registerForm.get(fieldName);
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
    if (errors['email'] || errors['pattern']) {
      if (fieldName === 'email') return `Invalid email format.`;
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
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      // Convert form data to snake_case
      const snakeCaseFormData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
      };

      console.log('Form Data (snake_case):', snakeCaseFormData); // Log snake_case data for verification

      this.http
        .post(`${environment.apiUrl}/api/v1/register`, snakeCaseFormData)
        .subscribe(
          (response: any) => {
            alert(response.message);
            this.router.navigate(['/login']);
          },
          (error) => {
            console.error('Error:', error);
          }
        );
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  private capitalize(fieldName: string): string {
    return fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
  }
}
