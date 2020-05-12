/*--------------------------------------------------------------------
Model to handle and store Firebase Email based User in our app
---------------------------------------------------------------------*/
export class FirebaseEmailAuthUser {
    public email: string;
    public id: string;
    private _token: string;
    private _tokenexpirationDate: Date;

    constructor(email: string, id: string, _token: string, _tokenexpirationDate: Date) {
        this.email = email;
        this.id = id;
        this._token = _token;
        this._tokenexpirationDate = _tokenexpirationDate;
    }

    get token() {
        if (!this._tokenexpirationDate || new Date() > this._tokenexpirationDate) {
            return null;
        }
        return this._token;
    }
    get tokenExpirationDate() {
        return this._tokenexpirationDate;
    }
}