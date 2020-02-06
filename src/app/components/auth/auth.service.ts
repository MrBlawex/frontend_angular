import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService{
    private isLoggin = false;

    // Вывод поля isLoggin из localStorage
    public getIsLogin(){
        return JSON.parse(localStorage.getItem('isLogin'));
    }

    // Запись в isLoggin и запись значения в localStorage
    public setIsLogin(bool:boolean){
        this.isLoggin = bool;
        localStorage.setItem('isLogin', String(this.isLoggin));
    }
}