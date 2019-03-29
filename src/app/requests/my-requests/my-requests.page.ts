import { Component, OnInit } from '@angular/core';
import { Request } from '../request.model';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.page.html',
  styleUrls: ['./my-requests.page.scss'],
})
export class MyRequestsPage implements OnInit {
  myRequests: Request[];
  constructor(private requestsService: RequestsService) { }

  ngOnInit() {
    this.myRequests = this.requestsService.requests;
  }

}
