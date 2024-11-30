import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TokenApiModel } from '../models/token-api.model';

@Injectable()
export class tokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();

    if (myToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` }
      })
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        // Handle Unauthorized errors
        if (err.status === 401) {
          return this.handleUnAuthorizedError(request, next);
        }
        
        // Handle any other errors
        else if (err.status === 500) {
          Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: 'There was an error processing your request. Please try again later.',
            timer: 3000,
            showConfirmButton: false,
            position: 'top-end',
            toast: true
          });
        }

        return throwError(() => new Error('An unexpected error occurred.'));
      })
    );
  }

  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler) {
    const tokenApiModel = new TokenApiModel();
    tokenApiModel.accessToken = this.auth.getToken()!;
    tokenApiModel.refreshToken = this.auth.getRefreshToken()!;
    
    return this.auth.renewToken(tokenApiModel)
      .pipe(
        switchMap((data: TokenApiModel) => {
          this.auth.storeRefreshToken(data.refreshToken);
          this.auth.storeToken(data.accessToken);

          req = req.clone({
            setHeaders: { Authorization: `Bearer ${data.accessToken}` }
          });

          return next.handle(req);
        }),
        catchError((err) => {
          // Handle refresh token error (e.g. session expiration)
          Swal.fire({
            icon: 'warning',
            title: 'Token Expired',
            text: 'Your session has expired. Please log in again.',
            iconColor: 'black',
            background: 'yellow',
            color: 'black',
            timer: 3000,
            timerProgressBar: true,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
          });
          this.router.navigate(['/login']);
          return throwError(() => new Error('Session expired, please log in again.'));
        })
      );
  }
}
