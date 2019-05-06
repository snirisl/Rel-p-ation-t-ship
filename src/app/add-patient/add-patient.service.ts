import { Injectable } from '@angular/core';
import { AddPatient } from './add-patient.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { take, switchMap, tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

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
export class AddPatientService {
  private _users = new BehaviorSubject<AddPatient[]>([]);

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private firestore: AngularFirestore,
    private addPatientService: AddPatientService
  ) {}

  getAddedUsers() {
    return this.firestore.collection('added-users').snapshotChanges();
  }

  createAddedUser(addedUser: AddPatient) {
    let user: any;
    user = Object.assign({}, {
      id: addedUser.id,
      name: addedUser.name,
      room: addedUser.room,
      type: addedUser.type,
      userId: addedUser.userId
    });
    return this.firestore.collection('added-users').add(user);
  }

  updateAddedUser(addedUser: AddPatient) {
    delete addedUser.id;
    this.firestore.doc('added-users/' + addedUser.id).update(addedUser);
  }

  deleteAddedUser(addedUserId: string) {
    this.firestore.doc('added-users/' + addedUserId).delete();
  }

  add(newAddedUser: AddPatient) {
    console.log('In add');
    this.createAddedUser(newAddedUser);
    // let generatedId: string;
    // let newUser: AddPatient;
    // return this.authService.userId.pipe(
    //   take(1),
    //   switchMap(userId => {
    //     if (!userId) {
    //       throw new Error('No user id found!');
    //     }
    //     console.log(newAddedUser.userId);
    //     newUser = new AddPatient(
    //       newAddedUser.id,
    //       newAddedUser.name,
    //       newAddedUser.type,
    //       newAddedUser.room,
    //       newAddedUser.userId
    //     );
    //     return this.http.post<{ name: string }>(
    //       `https://relpationtship-test.firebaseio.com/added-users.json/`,
    //       { ...newUser }
    //     );
    //   }),
    //   switchMap(resData => {
    //     generatedId = resData.name;
    //     return this.addedPatient;
    //   }),
    //   take(1),
    //   tap(users => {
    //     // newUser.userId = generatedId;
    //     // console.log('In add: ', generatedId);
    //     this._users.next(users.concat(newUser));
    //   })
    // );
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
                new AddPatient(
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
