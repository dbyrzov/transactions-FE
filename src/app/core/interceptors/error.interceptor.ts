import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MAIN_PATHS } from '../../app.routes';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private router = inject(Router);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.warn('Unauthorized! Redirecting to login...');
          this.router.navigate([MAIN_PATHS.LOGIN]);
        } else if (error.status === 403) {
          console.error('You do not have permission to perform this action.');
        } else if (error.status === 500) {
          console.error('Server error:', error.message);
        }

        return throwError(() => error);
      })
    );
  }
}
