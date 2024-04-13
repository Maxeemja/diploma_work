import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
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
  templateUrl: 'login.component.html',
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
export class LoginComponent implements OnInit {
  // injections
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private service = inject(AuthService);

  myForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  ngOnInit() {}

  onSubmit() {
    if (this.myForm.valid) {
      this.service.handleLogin(this.myForm.getRawValue());
    }
  }
}
