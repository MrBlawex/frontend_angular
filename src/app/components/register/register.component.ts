import {Component} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/user.service';
import { Router } from '@angular/router';


@Component({
    template:'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent{
    regForm: FormGroup;

    constructor(private formBuilt:FormBuilder, public userService:UsersService, private router:Router){
        this.regForm = formBuilt.group({
            'email': ["", [Validators.required, Validators.email]],
            'password': ["", [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
            'firstName': ["", [Validators.required, Validators.pattern('[a-zA-Z]*')]],
            'fullName': ["", [Validators.required, Validators.pattern('[a-zA-Z]*')]],
        })
    }

    submit(){
        this.userService.postRequestUser(this.regForm.value);
        this.router.navigateByUrl('/login');
    }
}