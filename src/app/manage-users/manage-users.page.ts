import { Component, OnInit } from '@angular/core';
import { Users } from '../users/users.model';
import { UsersService } from '../users/users.service';
import { IonItemSliding, AlertController } from '@ionic/angular';
import { Room } from '../users/room.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.page.html',
  styleUrls: ['./manage-users.page.scss']
})
export class ManageUsersPage implements OnInit {
  editState: Boolean = false;
  userToEdit: Users;

  roomsList$: Observable<Room[]>;
  usersList$: Observable<Users[]>;

  constructor(
    private userService: UsersService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.usersList$ = this.userService.getUsers();
    this.roomsList$ = this.userService.getRooms();
  }

  create(user: Users) {
    this.userService.add(user);
  }

  update(user: Users) {
    this.userService.updateAddedUser(user);
    this.clearState();
  }

  delete(user: Users) {
    this.clearState();
    this.userService.deleteUser(user);
    this.alertCtrl
      .create({
        header: 'Delete',
        message:
          'Patient record successfully deleted.',
        buttons: ['Okay']
      })
      .then(alertEl => {
        alertEl.present();
      });
  }

  editUser(event, user: Users, itemSliding: IonItemSliding) {
    itemSliding.close();
    this.editState = true;
    this.userToEdit = user;
  }

  clearState() {
    this.editState = false;
    this.userToEdit = null;
  }
}
