import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Request } from '../request.model';
import { RequestsService, RequestData } from '../requests.service';
import { IonItemSliding, IonSegment, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Users } from 'src/app/users/users.model';
import { map, take, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.page.html',
  styleUrls: ['./my-requests.page.scss']
})
export class MyRequestsPage implements OnInit, OnDestroy {
  requestsList: RequestData[];
  requestSubscription: Subscription;
  status = 'progress';
  isLoading = false;
  currUser: AngularFirestoreDocument<Users>;
  userRef: AngularFirestoreCollection<Users>;
  user$: Observable<Users[]>;

  @ViewChild(IonSegment) segment: IonSegment;
  requestsObs: Observable<any>;

  constructor(
    private requestsService: RequestsService,
    private router: Router,
    private loadingCtrl: LoadingController,
    public authService: AuthService,
    public firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.segment.value = 'progress';
    this.requestSubscription = this.requestsService
      .getRequests()
      .subscribe(requests => {
        this.requestsList = requests;
      });
  }

  ngOnDestroy() {
    if (this.requestSubscription) {
      this.requestSubscription.unsubscribe();
    }
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
}
