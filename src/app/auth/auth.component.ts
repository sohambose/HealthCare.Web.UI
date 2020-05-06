import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  AuthErr: string = '';
  isAuthenticating: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoginMode = true;
  }

  OnSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const email = form.value.email;
    const password = form.value.password;

    this.isAuthenticating = true;
    if (this.isLoginMode) {
      ///Logic for Login...
    }
    else {
      this.authService.signup(email, password).subscribe(resData => {
        this.isAuthenticating = false;
      },
        errorMsg => {
          this.AuthErr = errorMsg;
          this.isAuthenticating = false;
        }
      );
    }
    form.reset();
  }
}
