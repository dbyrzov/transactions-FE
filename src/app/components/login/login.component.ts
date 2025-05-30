import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { MAIN_PATHS } from '../../app.routes';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  loginForm = this.buildLoginForm();

  buildLoginForm() {
    return new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
      password: new FormControl('', Validators.required),
    });
  }

  get username() {
    return this.loginForm.get('username') as FormControl<string>;
  }

  get password() {
    return this.loginForm.get('password') as FormControl<string>;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const data = this.loginForm.getRawValue();

      this.authService
        .login(data)
        .pipe(tap(() => this.router.navigate([MAIN_PATHS.DEFAULT])))
        .subscribe();
    }
  }
}
