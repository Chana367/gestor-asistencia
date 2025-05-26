import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errorMessage: string = '';
  loginForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, complete todos los campos';
    } else {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password);
    }
  }
}