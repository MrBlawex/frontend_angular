import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent{

  authForm: FormGroup;

  constructor(private fromBuild:FormBuilder) { 
    this.authForm = fromBuild.group({
      'login': ["", [Validators.required, Validators.maxLength(255), Validators.minLength(6), Validators.pattern("^[a-zA-Z][0-9a-zA-Z]*")]],
      'password': ["", [Validators.required, Validators.maxLength(255), Validators.minLength(10)]]
    })
  }

  submit(){
    console.log(this.authForm);
  }

}
