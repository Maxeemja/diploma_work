import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-login',
  templateUrl: 'login-register-form.component.html',
  styleUrls: ['../create-edit/create-edit.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
})
export class LoginRegisterComponent implements OnInit {
  // injections
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private service = inject(AuthService);

  isLogin: boolean = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  registerForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.maxLength(10)]],
    secondName: ['', [Validators.required, Validators.maxLength(18)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  ngOnInit() {
    if (this.route.snapshot.url[0].path === 'login') {
      this.isLogin = true;
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.service.handleLogin(this.loginForm.getRawValue());
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.service.handleRegister(this.registerForm.getRawValue());
    }
  }
}
