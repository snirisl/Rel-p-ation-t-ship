import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToekn: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = false;
  private _userId = 'null';
  private _roomNumber = '100';
  private _userType = 'p';

  constructor(private http: HttpClient) {}

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  get userId() {
    return this._userId;
  }

  get patientRoomNumber() {
    return this._roomNumber;
  }

  get userType() {
    return this._userType;
  }
  login() {
    this._userIsAuthenticated = true;
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${
        environment.firebaseAPIKey
      }`,
      { email: email, password: password, returnSecureToken: true }
    );
  }

  logout() {
    this._userIsAuthenticated = false;
  }
}
