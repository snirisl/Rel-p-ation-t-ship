import { Component, OnInit } from '@angular/core';
import { Users } from '../users/users.model';
import { UsersService } from '../users/users.service';
import {
  IonItemSliding,
  AlertController,
  ToastController
} from '@ionic/angular';
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
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
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
    this.presentUpdateToast();
  }

  delete(user: Users) {
    this.clearState();
    this.userService.deleteUser(user);
    this.presentDeleteToast();
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

  async presentUpdateToast() {
    const toast = await this.toastCtrl.create({
      message: 'User profile updated.',
      duration: 3000
    });
    toast.present();
  }

  async presentDeleteToast() {
    const toast = await this.toastCtrl.create({
      message: 'User profile deleted.',
      duration: 3000
    });
    toast.present();
  }
}
