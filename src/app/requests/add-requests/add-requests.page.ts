import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../requests.service';
import { Request } from '../request.model';

@Component({
  selector: 'app-add-requests',
  templateUrl: './add-requests.page.html',
  styleUrls: ['./add-requests.page.scss']
})
export class AddRequestsPage implements OnInit {
  loadedRequests: Request[];
  constructor(private requestsService: RequestsService) {}

  ngOnInit() {
    this.loadedRequests = this.requestsService.requests;
  }

  addRequest(id) {
    this.requestsService.add(id);
  }
}
