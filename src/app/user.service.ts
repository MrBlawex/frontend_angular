import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UsersList{
    private users = [];

    addUser(user){
        this.users.push(user);
    }

    getUsers(){
        return this.users;
    }
}