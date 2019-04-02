import { Component, OnInit, ViewChild } from '@angular/core';
import { Request } from '../request.model';
import { RequestsService } from '../requests.service';
import { IonItemSliding, IonSegment } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.page.html',
  styleUrls: ['./my-requests.page.scss']
})
export class MyRequestsPage implements OnInit {
  myRequests: Request[];
  status = '';

  @ViewChild(IonSegment) segment: IonSegment;
  requestsObs: Observable<any>;

  constructor(
    private requestsService: RequestsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.segment.value = 'all';
    this.requestsObs = this.requestsService.getRequests();
  }

  onComplete(requestId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    console.log('Request Completed.');
  }

  onArchive(requestId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    console.log('Request Archived.');
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
