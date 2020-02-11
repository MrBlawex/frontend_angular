import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UsersService } from 'src/app/user.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;
  errorMessage = '';

  constructor(private fromBuilder: FormBuilder, private userService: UsersService,
              private authService: AuthService, private router: Router) {
    this.authForm = fromBuilder.group({
      login: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6), Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(10)]]
    });
  }

  ngOnInit() {
  }

  login() {
    this.userService.loginUser(this.authForm.value).subscribe(
      (data: any) => {
          if (data.success) {
            this.authService.setToken(data.token);
            this.router.navigateByUrl('/products');
          }
      },
      (res: any) => {
        if (res.status === 400) {
          this.errorMessage = res.error.errorMessage;
          this.addValidError(this.errorMessage);
        }
      });
  }

  private addValidError(errorMessage: string) {
    if (errorMessage.includes('login')) {
      this.authForm.get('login').setErrors({invalidLogin: true});
    } else if (errorMessage.includes('password')) {
      this.authForm.get('password').setErrors({invalidPassword: true});
    }
  }
}
