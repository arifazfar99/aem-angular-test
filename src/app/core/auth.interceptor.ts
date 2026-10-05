import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    if (!token) {
      return next.handle(request);
    }
    const authRequest = request.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/sign-in']);
        }
        return throwError(() => error);
      })
    );
  }
}
