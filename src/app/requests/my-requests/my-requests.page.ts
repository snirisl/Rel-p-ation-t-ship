import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Request } from '../request.model';
import { RequestsService } from '../requests.service';
import { IonItemSliding, IonSegment, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.page.html',
  styleUrls: ['./my-requests.page.scss']
})
export class MyRequestsPage implements OnInit, OnDestroy {
  myRequests: Request[];
  requestsSub: Subscription;
  status = 'progress';
  isLoading = false;

  @ViewChild(IonSegment) segment: IonSegment;
  requestsObs: Observable<any>;

  constructor(
    private requestsService: RequestsService,
    private router: Router,
    private loadingCtrl: LoadingController,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.segment.value = 'progress';
    this.requestsSub = this.requestsService.requests.subscribe(requests => {
      this.myRequests = requests;
    });
    console.log('type is', this.authService.userType);
  }

  ngOnDestroy() {
    if (this.requestsSub) {
      this.requestsSub.unsubscribe();
    }
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.requestsService.fetchRequests().subscribe(() => {
      this.isLoading = false;
    });
  }

  onFilterUpdate(event: any) {
    const filteredOption = event.detail.value;
    this.status = filteredOption;
  }

  doRefresh(event: any) {
    this.requestsService.fetchRequests().subscribe(() => {
      event.target.complete();
    });
  }

  setAsCompleted(id: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.loadingCtrl
      .create({
        message: 'Setting Request as Completed...'
      })
      .then(loadingEl => {
        loadingEl.present();
        this.requestsService.setRequestAsCompleted(id).subscribe(() => {
          loadingEl.dismiss();
        });
      });
  }
}
