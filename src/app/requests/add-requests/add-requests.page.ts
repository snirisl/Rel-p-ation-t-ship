import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../requests.service';
import { Request } from '../request.model';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { RequestMessageComponent } from './request-message/request-message.component';

@Component({
  selector: 'app-add-requests',
  templateUrl: './add-requests.page.html',
  styleUrls: ['./add-requests.page.scss']
})
export class AddRequestsPage implements OnInit {
  loadedRequests: Request[];
  request: Request;
  constructor(
    private requestsService: RequestsService,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.loadedRequests = this.requestsService.requests;
  }

  addRequest(request: Request) {
    this.actionSheetCtrl.create({
      header: 'Send this Request?',
      buttons: [
        {
          text: 'Send',
          handler: () => {
            this.openMessageModal('Send', request);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actionSheetEl => {
      actionSheetEl.present();
    });
  }

  openMessageModal(mode: 'Send', request) {
    console.log(mode);
    this.modalCtrl
      .create({
        component: RequestMessageComponent,
        componentProps: { selectedPlace: this.request }
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        console.log(resultData.data, resultData.role);
        if (resultData.role === 'confirm') {
          console.log('Request Sent!');
          console.log(request);
        }
      });
  }
}
