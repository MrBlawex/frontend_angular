import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService{
    // Вывод токена из LocalStroreg

    public getToken(){
        return localStorage.getItem('token');
    }

    // Запись токена в LocalStroreg
    public setToken(token:string){
        localStorage.setItem('token', token);
    }

    public isHasToken(){
        if (this.getToken() === null){
            return false;
        } 
        return true;
    }

    public deleteToken(){
        localStorage.removeItem('token');
    }
}