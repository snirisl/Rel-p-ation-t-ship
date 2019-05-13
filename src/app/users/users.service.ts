import { Injectable } from '@angular/core';
import { Users } from './users.model';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import {
  map,
  tap,
  publishBehavior,
  publishReplay,
  refCount
} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Room } from './room.model';

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
  userDoc: AngularFirestoreDocument<Users>;
  roomCollection: AngularFirestoreCollection<Room>;
  rooms: Observable<any[]>;
  assignedRoomsCollection: AngularFirestoreCollection<Room>;
  assignedRooms: Observable<any[]>;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    public firestore: AngularFirestore
  ) {}

  getUsers() {
    let nurseId: string;
    this.authService.userId.subscribe(x => {
      nurseId = x;
    });
    this.usersCollection = this.firestore.collection('added-users', ref =>
      ref.orderBy('name', 'asc')
    );
    return this.usersCollection.valueChanges();
  }

  getRooms() {
    this.roomCollection = this.firestore.collection('rooms', ref =>
      ref.orderBy('roomNum', 'asc')
    );
    return this.roomCollection.valueChanges().pipe(
      publishReplay(1),
      refCount()
    );
  }

  getRoomsAssigned() {
    let nurseId: string;
    this.authService.userId.subscribe(x => {
      nurseId = x;
    });
    this.assignedRoomsCollection = this.firestore.collection('rooms', ref =>
      ref.where('assignedNurse', '==', nurseId)
    );
    return this.assignedRoomsCollection.valueChanges().pipe(
      publishReplay(1),
      refCount()
    );
  }

  updateAddedUser(addedUser: Users) {
    this.userDoc = this.firestore.doc(`added-users/${addedUser.id}`);
    this.userDoc.update(addedUser);
  }

  deleteUser(deletedUser: Users) {
    this.userDoc = this.firestore.doc(`added-users/${deletedUser.id}`);
    this.userDoc.delete();
  }

  add(newAddedUser: Users) {
    return this.firestore
      .collection('added-users')
      .doc(newAddedUser.userId)
      .set({
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
