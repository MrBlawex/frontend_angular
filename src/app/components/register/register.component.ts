import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  regForm: FormGroup;
  errorMessage = ''; // Содержит сообщение с ошибкой от сервера

  constructor(
    private formBuilt: FormBuilder,
    public userService: UsersService,
    private router: Router
  ) {
    this.regForm = formBuilt.group({
      login: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]]
    });
  }

  // Метод который добавляем к определенному FormControl ошибку валидации
  private addValidError(errorMessage: string) {
    // Если сообщение о ошибке содержит login то добавляем ощибку для соответ. FormControl
    if (errorMessage.includes('login')) {
      this.regForm.get('login').setErrors({ invadLogin: true });
    }
  }

  public submit() {
    this.userService.registerUser(this.regForm.value).subscribe(
      (data: any) => {
        this.router.navigateByUrl('/login');
      },
      (res: any) => {
        if (res.status === 400) {
          this.errorMessage = res.error.errorMessage;
          this.addValidError(this.errorMessage);
        }
      }
    );
  }
}
