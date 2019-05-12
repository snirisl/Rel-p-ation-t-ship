import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users/users.service';
import { Room } from '../users/room.model';
import { AuthService } from '../auth/auth.service';
import { NgForm } from '@angular/forms';
import { RequestsService } from '../requests/requests.service';
import {
  AngularFirestoreDocument,
  AngularFirestore
} from '@angular/fire/firestore';

@Component({
  selector: 'app-assign-rooms',
  templateUrl: './assign-rooms.page.html',
  styleUrls: ['./assign-rooms.page.scss']
})
export class AssignRoomsPage implements OnInit {
  roomsList: Room[];
  allRooms: Room[];
  assignRoomsVar: any;
  unassignRoomsVar: any;
  roomDoc: AngularFirestoreDocument<Room>;
  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private requestService: RequestsService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.userService.getRooms().subscribe(rooms => {
      this.allRooms = rooms;
    });
    this.userService.getRoomsAssigned().subscribe(assignedRooms => {
      this.roomsList = assignedRooms;
    });
  }

  assignRooms() {
    let nurseId: string;
    this.authService.userId.subscribe(x => {
      nurseId = x;
    });
    console.log(this.assignRoomsVar);
    this.assignRoomsVar.forEach(element => {
      this.roomDoc = this.firestore.doc('rooms/' + element);
      this.roomDoc.update({ assignedNurse: nurseId });
    });
    this.assignRoomsVar = [];
    //  this.requestService.updateRequestRooms();
  }
  unassignRooms() {
    let nurseId: string;
    this.authService.userId.subscribe(x => {
      nurseId = x;
    });
    console.log(this.unassignRoomsVar);
    this.unassignRoomsVar.forEach(element => {
      this.roomDoc = this.firestore.doc('rooms/' + element);
      this.roomDoc.update({ assignedNurse: '' });
    });
    this.unassignRoomsVar = [];
    //  this.requestService.updateRequestRooms();
  }
}
