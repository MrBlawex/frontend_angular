import {Component} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/user.service';

@Component({
    template:'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent{
    regForm: FormGroup;

    constructor(private formBuilt:FormBuilder, public user:User){
        this.regForm = formBuilt.group({
            'email': ["", [Validators.required, Validators.email]],
            'password': ["", [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
        })
    }

    submit(user:User){
        this.user.postUserInfo(user);
    }
}