import { Component, OnInit } from '@angular/core';
import { Users } from '../users/users.model';
import { UsersService } from '../users/users.service';
import { IonItemSliding, ToastController } from '@ionic/angular';
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
    this.presentToast('User profile updated.');
  }

  dischargePatient(user: Users) {
    this.clearState();
    this.userService.dischargePatient(user);
    this.presentToast('The Patient was Successfully Discharged');
  }

  returnPatient(user: Users) {
    this.clearState();
    this.userService.returnPatient(user);
    this.presentToast('The Patient was Successfully Returned');
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

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      color: 'primary'
    });
    toast.present();
  }
}
