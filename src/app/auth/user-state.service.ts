import { Component, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private user = new BehaviorSubject({
    isLoggedIn: false,
    userType: null
  });

  constructor() {}

  setUser(user) {
    this.user.next(user);
  }

  getUser() {
    return this.user;
  }
}
