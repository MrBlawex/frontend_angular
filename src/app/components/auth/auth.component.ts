import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersList } from 'src/app/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent{

  authForm: FormGroup;
  users;

  constructor(private fromBuild:FormBuilder, private userList: UsersList) { 
    this.authForm = fromBuild.group({
      'login': ["", [Validators.required, Validators.maxLength(255), Validators.minLength(6), Validators.pattern("^[a-zA-Z][0-9a-zA-Z]*")]],
      'password': ["", [Validators.required, Validators.maxLength(255), Validators.minLength(10)]]
    })
  }

  ngOnInit(): void {
    this.users = this.userList.getUsers();
  }

  submit(){
    console.log(this.authForm);
  }
}
