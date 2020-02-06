import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService{
    private userStorage = localStorage;
    private isLoggin = false;

    // Вывод поля isLoggin из localStorage
    public getIsLogin(){
        return Boolean(JSON.parse(this.userStorage.getItem('isLogin')));
    }

    // Запись в isLoggin и запись значения в localStorage
    public setIsLogin(bool:boolean){
        this.isLoggin = bool;
        this.userStorage.setItem('isLogin', String(this.isLoggin));
    }
}