import { Injectable, inject, signal } from '@angular/core';
import { Member } from '../shared/interfaces/Member';
import { API_URL } from '../shared/constants';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

const authEndpointUrl = `${API_URL}/auth`;

@Injectable({ providedIn: 'root' })
export class AuthService {
  // injections
  private http = inject(HttpClient);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  public currentUser = signal<Member | null>(null);
  public fullName = signal('');

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUserId() {
    return localStorage.getItem('userId');
  }

  getFullName() {
    return `${this.currentUser()?.firstName} ${this.currentUser()?.secondName}`;
  }

  getCurrentUser() {
    this.http
      .get<Member>(`${API_URL}/members/${this.getCurrentUserId()}`)
      .pipe(take(1))
      .subscribe((member: Member) => {
        this.currentUser.set(member);
        this.fullName.set(`${member.firstName} ${member.secondName}`);
      });
  }

  handleLogin(payload: { email: string | null; password: string | null }) {
    this.http
      .post<any>(`${authEndpointUrl}/login`, payload)
      .pipe(take(1))
      .subscribe(({ token, userId }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
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

  handleLogout() {
    this.router.navigate(['login']);
    this.toastr.info('Здійснено вихід з акаунта', '');

    this.currentUser.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
}
