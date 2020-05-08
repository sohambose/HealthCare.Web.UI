import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { FirebaseEmailAuthUser } from './firebaseUser.model';


/*----------------------------------------------------------------------------- 
Response Payload for Google Firebase User for Email based Authentication:
PropertyName    Type        Description
------------    ------      --------------------------------------------------
idToken	        string	    A Firebase Auth ID token for the authenticated user.
email	        string	    The email for the authenticated user.
refreshToken	string	    A Firebase Auth refresh token for the authenticated user.
expiresIn	    string	    The number of seconds in which the ID token expires.
localId	        string	    The uid of the authenticated user.
registered	    boolean	    Whether the email is for an existing account.
--------------------------------------------------------------------------------*/

export interface FirebaseAuthResponseData {
    kind: string
    idToken: string
    email: string
    refreshToken: string
    expiresIn: string
    localId: string,
    registered?: boolean    //Used for login only.
}

@Injectable(
    {
        providedIn: 'root'
    }
)
export class FirebaseAuthService {
    //contextUser = new Subject<FirebaseUser>(); //A new subject
    constructor(private http: HttpClient) { }

    firebaseEmailSignup(inputemail: string, inputpassword: string) {
        return this.http.post<FirebaseAuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDesy12EjKKzZZOgBBmm7MA4R8s_elsIrw',
            {
                email: inputemail,
                password: inputpassword,
                returnSecureToken: true
            }
        )
            .pipe(
                catchError(errorRes => this.HandleFirebaseEmailAuthError(errorRes))
            )
    }

    firebaseEmailLogin(inputemail: string, inputpassword: string) {
        return this.http.post<FirebaseAuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDesy12EjKKzZZOgBBmm7MA4R8s_elsIrw',
            {
                email: inputemail,
                password: inputpassword,
                returnSecureToken: true
            }
        )
            .pipe(
                catchError(errorRes => this.HandleFirebaseEmailAuthError(errorRes))
            );
    }

    /* ///--Handle Auth based on Response From API
    private HandleAuthentication(responseEmail: string, reponseUserID: string, responseToken: string, responseExpiresIn: number) {
        //Get Expiration Date---
        const expirationDate = new Date(
            new Date().getTime() + responseExpiresIn * 1000
        );
        //Create the user based on response Received.
        const receivedUser = new FirebaseUser(responseEmail, reponseUserID, responseToken, expirationDate);
        this.contextUser.next(receivedUser);    //Emit this user to required parties as Current Context User
    } */

    ///--Handle Auth based on Response From API
    HandleFirebaseAuthentication(resData: FirebaseAuthResponseData) {
        const responseEmail: string = resData.email;
        const reponseUserID: string = resData.localId;
        const responseToken: string = resData.idToken;
        const responseExpiresIn: number = +resData.expiresIn;
        //Get Expiration Date---
        const expirationDate = new Date(
            new Date().getTime() + responseExpiresIn * 1000
        );
        //Create the user based on response Received.
        const receivedUser = new FirebaseEmailAuthUser(responseEmail, reponseUserID, responseToken, expirationDate);
        return receivedUser;    //Return the user to Parent Auth Component
    }


    private HandleFirebaseEmailAuthError(errorRes: HttpErrorResponse) {
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