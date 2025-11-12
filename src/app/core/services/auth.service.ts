import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

interface LoginResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.base}/login`, { username, password })
      .pipe(tap((res) => localStorage.setItem('auth_token', res.token)));
  }

  register(username: string, email: string, password: string) {
    return this.http.post(`${this.base}/register`, {
      username,
      email,
      password,
    });
  }

  forgotPassword(username: string, email: string) {
    return this.http.post(`${this.base}/reset-password`, { username, email });
  }

  resetPassword(
    username: string,
    email: string,
    passkey: string,
    newPassword: string
  ) {
    return this.http.post(`${this.base}/change-password`, {
      username,
      email,
      passkey,
      newPassword,
    });
  }

  logout() {
    localStorage.removeItem('auth_token');
  }

  get token(): string | null {
    return localStorage.getItem('auth_token');
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }
}
