import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService, AuthResponseData } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
  isLoading = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private zone: NgZone
  ) {}

  ngOnInit() {}

  authenticate(email: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({
        keyboardClose: true,
        message: 'Logging in...'
      })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>;
        authObs = this.authService.login(email, password);
        authObs.subscribe(
          resData => {
            this.isLoading = false;
            loadingEl.dismiss();
            this.zone.run(() => {
              this.router
                .navigate(['/requests', 'tabs', 'my-requests'])
                .then(() => {
                  location.reload();
                });
            });
          },
          errRes => {
            loadingEl.dismiss();
            const code = errRes.error.error.message;
            let message = 'Could not sign you up, please try again.';
            if (code === 'EMAIL_EXISTS') {
              message = 'This Id exists already!';
            } else if (code === 'EMAIL_NOT_FOUND') {
              message = 'No such user.';
            } else if (code === 'INVALID_PASSWORD') {
              message = 'Could not log you in, please try again.';
            }
            this.showAlert(message);
          }
        );
      });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const uid = form.value.pid + '@test.com';
    const password = form.value.password;
    this.authenticate(uid, password);
    form.reset();
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Authentication failed',
        message: message,
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }
}
