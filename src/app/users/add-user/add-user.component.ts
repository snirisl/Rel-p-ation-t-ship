import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/users/users.service';
import { Users } from 'src/app/users/users.model';
import { Room } from '../room.model';

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

  roomsList: Room[];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getRooms().subscribe(rooms => {
      this.roomsList = rooms;
      console.log('happened');
    });
  }
}
