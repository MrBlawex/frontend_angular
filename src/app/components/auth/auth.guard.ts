import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate{

    constructor(private auth:AuthService, private router:Router){}

    canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean{
        return this.checkLogin();
    }

    checkLogin(){
        if(this.auth.getToken() !== undefined){
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}