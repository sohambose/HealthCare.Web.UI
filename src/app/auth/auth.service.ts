import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
    kind: string
    idToken: string
    email: string
    refreshToken: string
    expiresIn: string
    localId: string,
    registered?: boolean
}

@Injectable(
    {
        providedIn: 'root'
    }
)
export class AuthService {
    contextUser = new Subject<User>(); //A new subject
    constructor(private http: HttpClient) { }

    signup(inputemail: string, inputpassword: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDesy12EjKKzZZOgBBmm7MA4R8s_elsIrw',
            {
                email: inputemail,
                password: inputpassword,
                returnSecureToken: true
            }
        )
            .pipe(
                tap(resData => {
                    this.HandleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
                }),
                catchError(errorRes => this.HandleAuthError(errorRes))
            )
    }

    login(inputemail: string, inputpassword: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDesy12EjKKzZZOgBBmm7MA4R8s_elsIrw',
            {
                email: inputemail,
                password: inputpassword,
                returnSecureToken: true
            }
        )
            .pipe(
                //----Tap the response and do our own job--
                tap(resData => {
                    this.HandleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
                }),
                catchError(errorRes => this.HandleAuthError(errorRes))
            );
    }

    ///--Handle Auth based on Response From API
    private HandleAuthentication(responseEmail: string, reponseUserID: string, responseToken: string, responseExpiresIn: number) {
        //Get Expiration Date---
        const expirationDate = new Date(
            new Date().getTime() + responseExpiresIn * 1000
        );
        //Create the user based on response Received.
        const receivedUser = new User(responseEmail, reponseUserID, responseToken, expirationDate);
        this.contextUser.next(receivedUser);    //Emit this user to required parties as Current Context User
    }


    private HandleAuthError(errorRes: HttpErrorResponse) {
        let errMsg = 'Unknown Error Occured';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errMsg);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errMsg = 'The email address is already in use by another account. Try another email';
                break;
            case 'OPERATION_NOT_ALLOWED':
                errMsg = 'Password sign-in is disabled for this project.';
                break;

            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errMsg = 'We have blocked all requests from this device due to unusual activity. Try again later.';
                break;

            case 'EMAIL_NOT_FOUND':
                errMsg = 'This Email is not registered with us';
                break;

            case 'INVALID_PASSWORD':
                errMsg = 'Email ID or Password is incorrect';
                break;

            case 'USER_DISABLED':
                errMsg = 'The user account has been disabled by an administrator.'
                break;

        }
        return throwError(errMsg);
    }
}