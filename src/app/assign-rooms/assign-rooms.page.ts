import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../users/users.service';
import { Room } from '../users/room.model';
import { AuthService } from '../auth/auth.service';
import {
  AngularFirestoreDocument,
  AngularFirestore
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
  roomList$: Observable<Room[]>;
  nurseId$: Observable<string>;

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.allRooms$ = this.userService.getRooms();
    this.roomList$ = this.userService.getRoomsAssigned();
    this.nurseId$ = this.authService.userId;
  }

  assignRooms() {
    let nurseId: string;
    this.nurseId$.subscribe(x => {
      nurseId = x;
    });
    this.assignRoomsVar.forEach(element => {
      this.roomDoc = this.firestore.doc('rooms/' + element);
      this.roomDoc.update({ assignedNurse: nurseId });
    });
    this.assignRoomsVar = [];
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
