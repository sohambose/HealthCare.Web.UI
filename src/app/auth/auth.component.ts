import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  AuthErr: string = '';
  isAuthenticating: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

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

    let authObs: Observable<AuthResponseData>;
    this.isAuthenticating = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    }
    else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(resData => {
      this.isAuthenticating = false;
      this.router.navigate(['/home']);
    },
      errorMsg => {
        this.AuthErr = errorMsg;
        this.isAuthenticating = false;
      }
    );

    form.reset();
  }
}
