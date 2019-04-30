import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = true;
  private _patientId = 'abc';

  constructor() { }

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  get patientId() {
    return this._patientId;
  }

  login() {
    this._userIsAuthenticated = true;
  }

  logout() {
    this._userIsAuthenticated = false;
  }
}
