import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class User{
    email:string;
    password:string;

    constructor(private http:HttpClient){ }

    postUserInfo(user:User){
        this.http.post('./userInfo.json', user)
    }
}