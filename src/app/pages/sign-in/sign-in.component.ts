import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  form = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  loading = false;
  errorMessage = "";
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    this.loading = true;
    this.errorMessage = "";
    const { username, password } = this.form.getRawValue();

    this.authService.login(username, password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = err.status === 401 
          ? 'Invalid username or password.' 
          : 'Unable to connect to the server. Please try again later.';
      }
    })
  }
}
