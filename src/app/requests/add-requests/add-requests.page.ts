import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../requests.service';
import { Request } from '../request.model';
import {
  ActionSheetController,
  ModalController,
  AlertController
} from '@ionic/angular';
import { RequestMessageComponent } from './request-message/request-message.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-requests',
  templateUrl: './add-requests.page.html',
  styleUrls: ['./add-requests.page.scss']
})
export class AddRequestsPage implements OnInit {
  loadedRequests: Observable<any>;
  request: Request;
  constructor(
    private requestsService: RequestsService,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadedRequests = this.requestsService.getRequests();
  }

  addRequest(request: Request) {
    this.actionSheetCtrl
      .create({
        header: 'Send this Request?',
        buttons: [
          {
            text: 'Send',
            handler: () => {
              this.presentAlert(request);
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      })
      .then(actionSheetEl => {
        actionSheetEl.present();
      });
  }

  async presentAlert(request: Request) {
    const alert = await this.alertController.create({
      header: 'Request Sent',
      message:
        'Your request has been submitted to the medical stuff.<br><br>Thank you.',
      buttons: [
        {
          text: 'Close',
          handler: () => {
            this.requestsService.add(request);
            this.router.navigateByUrl('/requests/tabs/my-requests');
          }
        }
      ]
    });
    await alert.present();
  }
}
