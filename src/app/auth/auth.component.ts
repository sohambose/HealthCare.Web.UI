import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseAuthService, FirebaseAuthResponseData } from './firbase-auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.AuthErr = '';
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

    let authObs = this.authService.getAuthResponseTypeObservable();
    if (this.isLoginMode) {
      authObs = this.authService.emailLogin(email, password); //--Login Mode
    }
    else {
      authObs = this.authService.emailSignup(email, password);  //--Signup Mode
    }

    authObs.subscribe(resData => {
      this.isAuthenticating = false;
      this.router.navigate(['/home']);  //Redirect to Home
    },
      errorMsg => {
        this.AuthErr = errorMsg;
        this.isAuthenticating = false;
      }
    );

    form.reset();
  }
}
