import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from '../auth/auth.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { UsersService } from './users.service';
import { Users } from './users.model';
import { Room } from './room.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss']
})
export class UsersPage implements OnInit, OnDestroy {
  isLoading = false;
  usersSub: Subscription;
  usersList: Users[];
  roomsList: Room[];

  useOcrFlag: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public usersService: UsersService
  ) {}

  ngOnInit() {
    this.usersSub = this.usersService.getUsers().subscribe(users => {
      this.usersList = users;
    });
    this.usersService.getRooms().subscribe(rooms => {
      this.roomsList = rooms;
    });
  }

  ngOnDestroy() {
    if (this.usersSub) {
      this.usersSub.unsubscribe();
    }
    this.useOcrFlag = false;
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.usersService.fetchUsers().subscribe(() => {
      this.isLoading = false;
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const uid = form.value.uid + '@test.com';
    const password = form.value.uid;
    const name = form.value.name;
    const type = form.value.type;
    const room = form.value.room ? form.value.room : '0';
    this.createUser(uid, password, name, type, room);
    form.reset();
  }

  createUser(
    uid: string,
    password: string,
    name: string,
    type: string,
    room: string
  ) {
    let localId: string;
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Creating User...' })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>;
        authObs = this.authService.signup(uid, password);
        authObs.subscribe(
          resData => {
            localId = resData.localId;
            this.isLoading = false;
            loadingEl.dismiss();
            const newAddedUser = new Users(uid, name, type, room, localId);
            this.usersService.add(newAddedUser);
            this.router.navigateByUrl('/requests/tabs/my-requests');
          },
          errRes => {
            loadingEl.dismiss();
            const code = errRes.error.error.message;
            let message = 'Could not add user, please try again.';
            if (code === 'EMAIL_EXISTS') {
              message = 'This Id exists already!';
            }
            this.showAlert(message);
          }
        );
      });
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'User creation failed',
        message: message,
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }

  changeOcrFlag() {
    this.useOcrFlag = !this.useOcrFlag;
  }
}
