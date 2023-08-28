export class User {
    public email: string;
    public id: string;
    private _token: any;
    private _tokenExpirationDate: Date

    constructor(email: string, id: string, token: string, _tokenExpiration: Date) {
        this.email = email;
        this.id = id;
        this._token = token;
        this._tokenExpirationDate = _tokenExpiration;

    }

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return false;
        }
        return this._token
    }
}