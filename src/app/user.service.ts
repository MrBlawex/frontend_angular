import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UsersService{
    private users = [];

    public postRequestUser(user){
        this.users.push(user);
    }
    
    public getUsers(){
        return this.users;
    }
}