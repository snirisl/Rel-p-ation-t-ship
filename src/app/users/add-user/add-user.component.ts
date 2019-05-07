import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/users/users.service';
import { Users } from 'src/app/users/users.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  user: Users = {
    id: '',
    name: '',
    type: '',
    room: '',
    userId: ''
  };

  constructor(private usersService: UsersService) {}

  ngOnInit() {}
}
