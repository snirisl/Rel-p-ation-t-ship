import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestsService, RequestData } from '../requests.service';
import { Request } from '../request.model';
import {
  ActionSheetController,
  AlertController,
  ToastController
} from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
    private router: Router,
    private toastCtrl: ToastController
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
              this.requestsService.addRequest(request).then(() => {
                this.router.navigateByUrl('/requests/tabs/my-requests');
                this.presentToast();
              });
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

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message:
        'Your request has been submitted to the medical stuff. Thank you.',
      duration: 3000,
      color: 'secondary',
    });
    toast.present();
  }
}
