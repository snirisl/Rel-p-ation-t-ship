import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestsService, RequestData } from '../requests.service';
import { IonItemSliding, IonSegment, LoadingController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Users } from 'src/app/users/users.model';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.page.html',
  styleUrls: ['./my-requests.page.scss']
})
export class MyRequestsPage implements OnInit {
  status = 'progress';
  requests$: Observable<RequestData[]>;

  @ViewChild(IonSegment) segment: IonSegment;

  constructor(
    private requestsService: RequestsService,
    private loadingCtrl: LoadingController,
    public authService: AuthService,
    public firestore: AngularFirestore
  ) {}

  ngOnInit() {
    console.log('in ngOnInit');
    this.segment.value = 'progress';
    this.requests$ = this.requestsService.getRequests();
  }

  onFilterUpdate(event: any) {
    const filteredOption = event.detail.value;
    this.status = filteredOption;
  }

  setAsCompleted(slidingItem: IonItemSliding, request: RequestData) {
    slidingItem.close();
    this.loadingCtrl
      .create({
        message: 'Setting Request as Completed...'
      })
      .then(loadingEl => {
        loadingEl.present();
        this.requestsService.updateRequest(request).then(() => {
          loadingEl.dismiss();
        });
      });
  }

  deleteRequest(slidingItem: IonItemSliding, request: RequestData) {
    console.log('in delete');
    slidingItem.close();
    this.loadingCtrl
      .create({
        message: 'Deleting Request...'
      })
      .then(loadingEl => {
        loadingEl.present();
        console.log('in delete 2');
        this.requestsService.deleteRequest(request).then(() => {
          loadingEl.dismiss();
        });
      });
  }
}
