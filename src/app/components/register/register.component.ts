import {Component} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    template:'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent{
    regForm: FormGroup;

    constructor(private formBuilt:FormBuilder){
        this.regForm = formBuilt.group({
            'email': ["", Validators.required],
            'login': ["", Validators.required],
            'password': ["", Validators.required],
        })
    }

    submit(){
        console.log(this.regForm);
    }
}