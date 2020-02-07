import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IRegister } from 'src/app/models/IRegister';
import { ILogin } from 'src/app/models/ILogin';
 
@Injectable({
    providedIn: 'root'
})
export class UsersService{
    private users = [];
    private readonly baseUrl = 'https://localhost:5001';
    private readonly postRegister = '/register';
    private readonly postLogin = '/login';

    private handleErro(error: HttpErrorResponse){
        if (error.error instanceof ErrorEvent){
            console.log('An occurade error in client-side', error.error.message);
        } else {
            console.log(`BackEnd returns error ${error.status} body was ${error.error}`);
        }
        return throwError('Something bad happened; please try again later.');
    }

    constructor(private http:HttpClient){}

    public registerUser(body:IRegister){
        return this.http.post(this.baseUrl + this.postRegister, body)
        .pipe(
            catchError(this.handleErro),
        );
    }

    public loginUser(body:ILogin){
        return this.http.post(this.baseUrl + this.postLogin, body)
        .pipe(
            catchError(this.handleErro),
        );
    }
}