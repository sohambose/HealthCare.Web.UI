import { Injectable } from '@angular/core';
import { FirebaseAuthService, FirebaseAuthResponseData } from './firbase-auth.service';
import { FirebaseEmailAuthUser } from './firebaseUser.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthMethods } from '../AppUtilities/AppEnum';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class AuthService {
    //Get Auth Method from Local storage- Auth Component will store the value.
    _AuthMethod: number;
    _contextUser = this.getAuthUserTypeSubject();
    //_contextUser = new BehaviorSubject<FirebaseEmailAuthUser>(null);
    tokenExpirationTimer;
    EmailAuthExpiresIn;

    constructor(private firebaseAuth: FirebaseAuthService,
        private router: Router) {
        this._contextUser = this.getAuthUserTypeSubject();
    }

    private getAuthUserTypeSubject() {
        this._AuthMethod = Number(localStorage.getItem('AuthMode'));
        switch (this._AuthMethod) {
            case AuthMethods.googleFirebaseEmailAuth: {
                return new BehaviorSubject<FirebaseEmailAuthUser>(null);  //For Google Firebase Type User
            }
            default: {
                return new BehaviorSubject<FirebaseEmailAuthUser>(null);
            }
        }
    }

    getAuthResponseTypeObservable() {
        this._AuthMethod = Number(localStorage.getItem('AuthMode'));
        switch (this._AuthMethod) {
            case AuthMethods.googleFirebaseEmailAuth: {
                return new Observable<FirebaseAuthResponseData>();
            }
            default: {
                return null;
            }
        }
    }


    //Generic method to call Email signup- Decide inside which backend service to call
    emailSignup(inputEmailID: string, inputPassword: string) {
        this._AuthMethod = Number(localStorage.getItem('AuthMode'));
        switch (this._AuthMethod) {
            case AuthMethods.googleFirebaseEmailAuth: {
                return this.firebaseAuth.firebaseEmailSignup(inputEmailID, inputPassword)
                    .pipe(
                        tap(resData => {
                            const firebaseUser = this.firebaseAuth.HandleFirebaseAuthentication(resData);
                            this.EmailAuthExpiresIn = resData.expiresIn;
                            if (this._contextUser == null) {
                                this._AuthMethod = Number(localStorage.getItem('AuthMode'));
                                this._contextUser = this.getAuthUserTypeSubject();
                            }
                            this.EmailAutoLogout(this.EmailAuthExpiresIn * 1000);
                            this._contextUser.next(firebaseUser);
                        })
                    );
            }
            default: {
                return null;
            }
        }
    }

    //Generic method to call EmailLogin- Decide inside which backend service to call
    emailLogin(inputEmailID: string, inputPassword: string) {
        this._AuthMethod = Number(localStorage.getItem('AuthMode'));
        switch (this._AuthMethod) {
            case AuthMethods.googleFirebaseEmailAuth: {
                return this.firebaseAuth.firebaseEmailLogin(inputEmailID, inputPassword)
                    .pipe(
                        tap(resData => {
                            const firebaseUser = this.firebaseAuth.HandleFirebaseAuthentication(resData);
                            this.EmailAuthExpiresIn = resData.expiresIn;
                            if (this._contextUser == null) {
                                this._contextUser = this.getAuthUserTypeSubject();
                            }
                            this.EmailAutoLogout(this.EmailAuthExpiresIn * 1000);
                            this._contextUser.next(firebaseUser);
                        })
                    );
            }
            default: {
                return null;
            }
        }
    }

    emailAutoLogin() {
        //--------------Case for Firebase Email Auto Login-------------------
        const loadedUser = this.firebaseAuth.firebaseEmailAutoLogin();
        if (this._contextUser && loadedUser) {
            this._contextUser.next(loadedUser);
            this.EmailAutoLogout(new Date(loadedUser.tokenExpirationDate).getTime() - new Date().getTime());
        }
        //------------------------------------------------------------------------
    }

    EmailAutoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.EmailLogout();
        }, expirationDuration);
    }

    EmailLogout() {
        this._contextUser.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('healthcareAuthKey');
        localStorage.removeItem('AuthMode');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }
}