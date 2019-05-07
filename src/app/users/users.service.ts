import { Injectable } from '@angular/core';
import { Users } from './users.model';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

interface UserData {
  id: string;
  name: string;
  type: string;
  room: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _users = new BehaviorSubject<Users[]>([]);
  usersCollection: AngularFirestoreCollection<Users>;
  users: Observable<any[]>;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    public firestore: AngularFirestore
  ) {
    // this.users = this.firestore.collection('added-users').valueChanges();
    this.users = this.firestore
      .collection('added-users')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as Users;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
    }

  getUsers() {
    return this.users;
  }

  updateAddedUser(addedUser: Users) {
    delete addedUser.id;
    this.firestore.doc('added-users/' + addedUser.id).update(addedUser);
  }

  deleteAddedUser(addedUserId: string) {
    this.firestore.doc('added-users/' + addedUserId).delete();
  }

  add(newAddedUser: Users) {
    return this.firestore.collection('added-users').doc(newAddedUser.id).set({
        id: newAddedUser.id,
        name: newAddedUser.name,
        room: newAddedUser.room,
        type: newAddedUser.type,
        userId: newAddedUser.userId
      });
  }

  fetchUsers() {
    return this.http
      .get<{ [key: string]: UserData }>(
        `https://relpationtship-test.firebaseio.com/added-users.json`
      )
      .pipe(
        map(usersData => {
          const users = [];
          for (const key in usersData) {
            if (usersData.hasOwnProperty(key)) {
              users.push(
                new Users(
                  usersData[key].id,
                  usersData[key].name,
                  usersData[key].type,
                  usersData[key].room,
                  key
                )
              );
            }
          }
          return users;
        }),
        tap(AddedUsers => {
          this._users.next(AddedUsers);
        })
      );
  }

  get addedPatient() {
    return this._users.asObservable();
  }
}
