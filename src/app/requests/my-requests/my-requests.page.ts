import { Component, OnInit } from '@angular/core';
import { Request } from '../request.model';
import { RequestsService } from '../requests.service';
import { IonItemSliding, } from '@ionic/angular';
import { Router } from '@angular/router';
import { SegmentChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.page.html',
  styleUrls: ['./my-requests.page.scss']
})
export class MyRequestsPage implements OnInit {
  myRequests: Request[];
  constructor(
    private requestsService: RequestsService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.myRequests = this.requestsService.requests;
  }

  onComplete(requestId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    console.log('Request Completed.');
  }

  onArchive(requestId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    console.log('Request Archived.');
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
  }
}
