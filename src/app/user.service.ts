import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RegistratinModel } from 'src/app/models/Registeration';
import { LoginModel } from 'src/app/models/Login';


@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private users = [];
    private readonly baseUrl = 'https://localhost:5001';
    private readonly postRegister = '/register';
    private readonly postLogin = '/login';

    private handleError(res: HttpErrorResponse) {
        const {error, status} = res;
        if (error instanceof ErrorEvent) {
            console.log('An occurade error in client-side', error.message);
        } else {
            console.log(`BackEnd returns error ${status} body was ${error.errorMessage}`);
        }
        return throwError(res);
    }

    constructor(private http: HttpClient) {}

    public registerUser(body: RegistratinModel) {
        return this.http.post(this.baseUrl + this.postRegister, body)
        .pipe(
            catchError(error => this.handleError(error)),
        );
    }

    public loginUser(body: LoginModel) {
        return this.http.post(this.baseUrl + this.postLogin, body)
        .pipe(
            catchError(error => this.handleError(error)),
        );
    }
}
