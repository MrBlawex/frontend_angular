import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private router: Router;

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = localStorage.getItem('token');

        if (idToken) {
            req = req.clone({
                headers: req.headers.set('Authorization',
                'bearer ' + idToken)
            });
        }

        return next.handle(req).pipe(
            catchError(err => {
                if (err instanceof HttpErrorResponse && err.status === 401) {
                    console.log('auth error');
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('/login');
                }
                return throwError(err);
            })
        );
    }
}
