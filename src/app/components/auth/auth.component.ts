import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/user.service';
import {AuthService} from './auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent{

  authForm: FormGroup;
  users;

  constructor(private fromBuild:FormBuilder, private userService: UsersService, private authService:AuthService, private router: Router) { 
    this.authForm = fromBuild.group({
      'login': ["", [Validators.required, Validators.maxLength(255), Validators.minLength(6), Validators.pattern("^[a-zA-Z][0-9a-zA-Z]*")]],
      'password': ["", [Validators.required, Validators.maxLength(255), Validators.minLength(10)]]
    })
  }

  ngOnInit(){
  }

  submit(){
    console.log(this.authForm);
  }

  login(){
    this.authService.setIsLogin(true);
    this.router.navigateByUrl('/products');
  }
}
