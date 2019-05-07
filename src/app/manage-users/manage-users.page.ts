import { Component, OnInit } from '@angular/core';
import { Users } from '../users/users.model';
import { UsersService } from '../users/users.service';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.page.html',
  styleUrls: ['./manage-users.page.scss']
})
export class ManageUsersPage implements OnInit {
  usersList: Users[];
  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getUsers().subscribe(users => {
      this.usersList = users;
    });
    // this.addPatientService.getUsers().subscribe(data => {
    //   this.addedUsers = data.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       ...e.payload.doc.data()
    //     } as Users;
    //   });
    // });
  }

  create(user: Users) {
    this.usersService.add(user);
  }

  update(user: Users) {
    this.usersService.updateAddedUser(user);
  }

  delete(user: Users) {
    this.usersService.deleteUser(user);
  }
}
