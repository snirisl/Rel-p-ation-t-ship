import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestsService, RequestData } from '../requests.service';
import { IonItemSliding, IonSegment, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

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
    slidingItem.close();
    this.loadingCtrl
      .create({
        message: 'Deleting Request...'
      })
      .then(loadingEl => {
        loadingEl.present();
        this.requestsService.deleteRequest(request).then(() => {
          loadingEl.dismiss();
        });
      });
  }
}
