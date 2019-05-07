import { Component, OnInit } from '@angular/core';
import { AddUser } from '../users/users.model';
import { AddUserService } from '../users/users.service';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.page.html',
  styleUrls: ['./manage-users.page.scss']
})
export class ManageUsersPage implements OnInit {
  usersList: AddUser[];
  constructor(private addUserService: AddUserService) {}

  ngOnInit() {
    this.addUserService.getUsers().subscribe(users => {
      this.usersList = users;
    });
    // this.addPatientService.getUsers().subscribe(data => {
    //   this.addedUsers = data.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       ...e.payload.doc.data()
    //     } as AddUser;
    //   });
    // });
  }

  create(addedUser: AddUser) {
    this.addUserService.add(addedUser);
  }

  update(addedUser: AddUser) {
    this.addUserService.updateAddedUser(addedUser);
  }

  delete(id: string) {
    this.addUserService.deleteAddedUser(id);
  }
}
