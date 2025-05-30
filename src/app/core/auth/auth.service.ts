import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { buildApi } from './auth.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  login(credentials: {
    username: string | null;
    password: string | null;
  }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const httpBody = new HttpParams()
      .set('username', credentials.username || '')
      .set('password', credentials.password || '')
      .toString();
    return this.http.post(buildApi('auth/login'), httpBody, {
      withCredentials: true,
      headers,
    });
  }

  logout(): Observable<any> {
    return this.http.post(buildApi('auth/logout'), {});
  }

  isLoggedIn(): Observable<boolean> {
    return this.http
      .get<{ authenticated: boolean }>(buildApi('auth/check'), {
        withCredentials: true,
      })
      .pipe(
        map((response) => response.authenticated),
        catchError(() => of(false))
      );
  }
}
