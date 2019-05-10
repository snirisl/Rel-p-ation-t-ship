import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestsService, RequestData } from '../requests.service';
import { Request } from '../request.model';
import {
  ActionSheetController,
  ModalController,
  AlertController
} from '@ionic/angular';
import { RequestMessageComponent } from './request-message/request-message.component';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DepartmentRequestsService } from '../department-requests.service';
import { StaticRequest } from '../static-requests.model';

@Component({
  selector: 'app-add-requests',
  templateUrl: './add-requests.page.html',
  styleUrls: ['./add-requests.page.scss']
})
export class AddRequestsPage implements OnInit, OnDestroy {
  loadedRequests: StaticRequest[];
  requestsSub: Subscription;
  request: Request;
  newRequest: RequestData;
  constructor(
    private requestsService: RequestsService,
    private departmentRequestsService: DepartmentRequestsService,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.requestsSub = this.departmentRequestsService.departmentRequests.subscribe(
      requests => {
        this.loadedRequests = requests;
      }
    );
  }

  ngOnDestroy() {
    if (this.requestsSub) {
      this.requestsSub.unsubscribe();
    }
  }

  addRequest(request: StaticRequest) {
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

  async presentAlert(request: StaticRequest) {
    const alert = await this.alertController.create({
      header: 'Request Sent',
      message:
        'Your request has been submitted to the medical stuff.<br><br>Thank you.',
      buttons: [
        {
          text: 'Close',
          handler: () => {
            this.requestsService.addRequest(request).then(() => {
              this.router.navigateByUrl('/requests/tabs/my-requests');
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
