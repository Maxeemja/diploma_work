import { Injectable, inject } from '@angular/core';
import { Member } from '../shared/interfaces/Member';
import { API_URL } from '../shared/constants';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

const authEndpointUrl = `${API_URL}/auth`;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  handleLogin(payload: { email: string | null; password: string | null }) {
    this.http
      .post<any>(`${authEndpointUrl}/login`, payload)
      .pipe(take(1))
      .subscribe(({ token }) => {
        localStorage.setItem('token', token);
        this.toastr.success('Успішно авторизовано', '');
        this.router.navigate(['/']);
      });
  }

  handleRegister(payload: {
    email: string | null;
    password: string | null;
    firstName: string | null;
    secondName: string | null;
  }) {
    this.http
      .post<any>(`${authEndpointUrl}/register`, payload)
      .pipe(take(1))
      .subscribe(() => {
        try {
          const { email, password } = payload;
          this.handleLogin({ email, password });
        } catch (err: any) {
          this.toastr.error(err?.error?.message);
          return;
        }
        this.toastr.success('Успішно зареєстровано', '');
        this.router.navigate(['/login']);
      });
  }
}
