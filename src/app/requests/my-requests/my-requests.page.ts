import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Request } from '../request.model';
import { RequestsService } from '../requests.service';
import { IonItemSliding, IonSegment } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.page.html',
  styleUrls: ['./my-requests.page.scss']
})
export class MyRequestsPage implements OnInit, OnDestroy {
  myRequests: Request[];
  requestsSub: Subscription;
  status = '';
  isLoading = false;

  @ViewChild(IonSegment) segment: IonSegment;
  requestsObs: Observable<any>;

  constructor(
    private requestsService: RequestsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.segment.value = 'all';
    this.requestsSub = this.requestsService.requests.subscribe(requests => {
      this.myRequests = requests;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.requestsService.fetchRequests().subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.requestsSub) {
      this.requestsSub.unsubscribe();
    }
  }

  onFilterUpdate(event: any) {
    const filteredOption = event.detail.value;
    if (filteredOption === 'all') {
      this.status = '';
      return;
    }
    this.status = filteredOption;
    console.log(this.status);
  }
}
