import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import {catchError} from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class UsersService{
    private users = [];
    private readonly baseUrl = 'https://localhost:5001/api/Account/Register';
    private readonly postUrl = '';
    private readonly getUrl = '';

    private handleErro(error: HttpErrorResponse){
        if (error.error instanceof ErrorEvent){
            console.log('An occurade error in client-side', error.error.message);
        } else {
            console.log(`BackEnd returns error ${error.status} body was ${error.error}`);
        }
        return throwError('Something bad happened; please try again later.');
    }

    constructor(private http:HttpClient){}

    public postRequestUser(body){
        return this.http.post(this.baseUrl, body)
        .pipe(
            catchError(this.handleErro),
        );
    }

    public getRequestUser(){
        return this.http.get(this.baseUrl + this.getUsers);
    }
    
    public getUsers(){
        return this.users;
    }

    public testadd(user){
        this.users.push(user);
    }
}