import { Injectable } from '@angular/core';
import { FirebaseAuthService, FirebaseAuthResponseData } from './firbase-auth.service';
import { FirebaseEmailAuthUser } from './firebaseUser.model';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable(
    {
        providedIn: 'root'
    }
)
export class AuthService {
    _contextUser = this.getAuthUserTypeSubject();

    private authMode: number;

    constructor(private firebaseAuth: FirebaseAuthService) { }

    private getAuthUserTypeSubject() {
        //--------For Google Firebase Type User--------------------
        return new Subject<FirebaseEmailAuthUser>();  //A new subject
        //---------------------------------------------------------
    }

    getAuthResponseTypeObservable() {
        //--------For Google Firebase Email Type Response----------
        return new Observable<FirebaseAuthResponseData>();
        //---------------------------------------------------------
    }


    //Generic method to call signup- Decide inside which backend service to call
    emailSignup(inputEmailID: string, inputPassword: string) {
        //----------------Google Firebase Authentication--------------------------
        return this.firebaseAuth.firebaseEmailSignup(inputEmailID, inputPassword)
            .pipe(
                tap(resData => {
                    const firebaseUser = this.firebaseAuth.HandleFirebaseAuthentication(resData);
                    this._contextUser.next(firebaseUser);
                })
            );
        //------------------------------------------------------------------------
    }

    //Generic method to call Login- Decide inside which backend service to call
    emailLogin(inputEmailID: string, inputPassword: string) {
        //----------------Google Firebase Authentication--------------------------
        return this.firebaseAuth.firebaseEmailLogin(inputEmailID, inputPassword)
            .pipe(
                tap(resData => {
                    const firebaseUser = this.firebaseAuth.HandleFirebaseAuthentication(resData);
                    this._contextUser.next(firebaseUser);
                })
            );;
        //------------------------------------------------------------------------
    }
}