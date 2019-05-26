import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, from } from 'rxjs';
import { User } from './user.model';
import { map, tap } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';
import { Users } from '../users/users.model';
import {
  AngularFirestore, AngularFirestoreDocument
} from '@angular/fire/firestore';

export interface AuthResponseData {
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
  private _user = new BehaviorSubject<User>(null);
  private _userType: string;
  private _userName: string;
  private _userRoom: string;
  private _userId: string;
  private userDoc: AngularFirestoreDocument<Users>;

  constructor(private http: HttpClient, private firestore: AngularFirestore) {
    from(Plugins.Storage.get({ key: 'authData' }))
      .pipe(
        map(storedData => {
          if (!storedData || !storedData.value) {
            return null;
          }
          const parsedData = JSON.parse(storedData.value) as {
            token: string;
            tokenExpirationDate: string;
            userId: string;
            email: string;
            userType: string;
            userName: string;
            userRoom: string;
          };
          this._userName = parsedData.userName;
          this._userType = parsedData.userType;
          this._userRoom = parsedData.userRoom;
          this._userId = parsedData.userId;
        })
      )
      .subscribe();
  }

  getCurrUser() {
    this.userDoc = this.firestore.doc('added-users/' + this._userId);
    return this.userDoc.valueChanges();
  }

  get userName() {
    return this._userName;
  }

  getUserType(userId: string) {
    const userQuery = this.firestore.doc<Users>(`added-users/${userId}`);
    userQuery.valueChanges().subscribe(x => {
      if (!x) {
        return;
      }
      this._userType = x.type;
      this._userName = x.name;
      this._userRoom = x.room;
    });
  }

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  get userId() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return user.id;
        } else {
          return null;
        }
      })
    );
  }

  get userType() {
    return this._userType;
  }

  get userRoom() {
    return this._userRoom;
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${
          environment.firebaseAPIKey
        }`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(tap(this.setUserData.bind(this)));
  }

  autoLogin() {
    return from(Plugins.Storage.get({ key: 'authData' })).pipe(
      map(storedData => {
        if (!storedData || !storedData.value) {
          return null;
        }
        const parsedData = JSON.parse(storedData.value) as {
          token: string;
          tokenExpirationDate: string;
          userId: string;
          email: string;
          userType: string;
          userName: string;
        };
        const expirationTime = new Date(parsedData.tokenExpirationDate);
        if (expirationTime <= new Date()) {
          return null;
        }
        const user = new User(
          parsedData.userId,
          parsedData.email,
          parsedData.token,
          expirationTime,
          parsedData.userName,
          parsedData.userType
        );
        return user;
      }),
      tap(user => {
        if (user) {
          this._user.next(user);
        }
      }),
      map(user => {
        return !!user;
      })
    );
  }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${
          environment.firebaseAPIKey
        }`,
        { email: email, password: password, returnSecureToken: true }
      );
  }

  logout() {
    this._user.next(null);
    Plugins.Storage.remove({ key: 'authData' });
  }

  private setUserData(userData: AuthResponseData) {
    const expirationTime = new Date(
      new Date().getTime() + +userData.expiresIn * 1000
    );
    this._user.next(
      new User(
        userData.localId,
        userData.email,
        userData.idToken,
        expirationTime
      )
    );
    this.getUserType(userData.localId);
    this.storeAuthData(
      userData.localId,
      userData.idToken,
      expirationTime.toISOString(),
      userData.email,
      this.userType,
      this.userName,
      this.userRoom
    );
  }

  private storeAuthData(
    userId: string,
    token: string,
    tokenExpirationDate: string,
    email: string,
    userType: string,
    userName: string,
    userRoom: string
  ) {
    const data = JSON.stringify({
      userId: userId,
      token: token,
      tokenExpirationDate: tokenExpirationDate,
      email: email,
      userType: userType,
      userName: userName,
      userRoom: userRoom
    });
    Plugins.Storage.set({ key: 'authData', value: data });
  }
}
