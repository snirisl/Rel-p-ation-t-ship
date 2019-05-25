import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../users/users.service';
import { Room } from '../users/room.model';
import { AuthService } from '../auth/auth.service';
import {
  AngularFirestoreDocument,
  AngularFirestore
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-assign-rooms',
  templateUrl: './assign-rooms.page.html',
  styleUrls: ['./assign-rooms.page.scss']
})
export class AssignRoomsPage implements OnInit {
  assignRoomsVar: any;
  unassignRoomsVar: any;
  roomDoc: AngularFirestoreDocument<Room>;

  allRooms$: Observable<Room[]>;
  roomList$: Observable<string[]>;
  nurseId$: Observable<string>;

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.allRooms$ = this.userService.getRooms();
    this.roomList$ = this.authService.getCurrUser().pipe(map(x => x.rooms));
    this.nurseId$ = this.authService.userId;
  }

  ionViewWillEnter() {
    this.allRooms$ = this.userService.getRooms();
    this.roomList$ = this.authService.getCurrUser().pipe(map(x => x.rooms));
    this.nurseId$ = this.authService.userId;
  }

  assignRooms() {
    let nurseId: string;
    this.nurseId$.subscribe(x => {
      nurseId = x;
    });
    this.firestore
      .doc('added-users/' + nurseId)
      .update({ rooms: this.assignRoomsVar })
      .then(x => {
        this.assignRoomsVar = [];
      });
    // this.assignRoomsVar.forEach(element => {
    //   this.roomDoc = this.firestore.doc('rooms/' + element);
    //   this.roomDoc.update({ assignedNurse: nurseId });
    // });
  }
  unassignRooms() {
    let nurseId: string;
    this.nurseId$.subscribe(x => {
      nurseId = x;
    });
    console.log(this.unassignRoomsVar);
    this.unassignRoomsVar.forEach(element => {
      this.roomDoc = this.firestore.doc('rooms/' + element);
      this.roomDoc.update({ assignedNurse: '' });
    });
    this.unassignRoomsVar = [];
  }
}
