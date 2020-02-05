import { Injectable } from '@angular/core';


@Injectable()
export class UsersList{
    public users = [];

    addUser(user){
        this.users.push(user);
    }

    getUsers(){
        return this.users;
    }
}