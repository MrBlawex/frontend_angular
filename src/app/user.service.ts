import { Injectable } from '@angular/core';


@Injectable()
export class UsersList{
    users = [];

    addUser(user){
        this.users.push(user);
        let jsn = JSON.stringify(this.users);
        console.log(jsn);
        
    }

    getUsers(){
        return this.users;
    }
}