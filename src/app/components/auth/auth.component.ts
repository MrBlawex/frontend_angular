import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm, FormGroupDirective, AbstractControl } from '@angular/forms';
import { UsersService } from 'src/app/user.service';
import { AuthService } from './auth.service'
import { Router } from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent{

  authForm: FormGroup;
  errorMessage: string = "";

  constructor(private fromBuild:FormBuilder, private userService: UsersService, private authService:AuthService, private router: Router) { 
    this.authForm = fromBuild.group({
      'login': ["", [Validators.required, Validators.maxLength(255), Validators.minLength(6), Validators.email]],
      'password': ["", [Validators.required, Validators.maxLength(255), Validators.minLength(10)]]
    })
  }

  ngOnInit(){
  }

  submit(){
    console.log(this.authForm);
  }

  login(){
    this.userService.loginUser(this.authForm.value).subscribe(
      (data:any) => {
          if (data.success === true){
            this.authService.setToken(data.token);
            this.router.navigateByUrl('/products');
            this.userService.registerUser(this.authForm.value);
          } 
      },
      (res:any) =>{
        if (res.status == 400){
          this.errorMessage = res.error.errorMessage;

          if (this.errorMessage.includes('login')){
            this.authForm.get('login').setErrors({invalidLogin: true});
          } else if (this.errorMessage.includes('password')){
            this.authForm.get('password').setErrors({invalidPassword: true});
            console.log(this.authForm.get('password').errors);
          }
        }
      }
    )
  }
}
