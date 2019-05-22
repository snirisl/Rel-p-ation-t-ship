import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StaticRequest } from './static-requests.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentRequestsService {
  private _departmentRequests = new BehaviorSubject<StaticRequest[]>([
    new StaticRequest(
      'Towel',
      'Need new towel',
      'assets/Images/Towels.jpeg'
    ),
    new StaticRequest(
      'Get up',
      'Need help getting out of bed',
      'assets/Images/Get_up.jpg'
    ),
    new StaticRequest(
      'Shower',
      'I want to take a shower',
      'assets/Images/Shower.jpg'
    ),
    new StaticRequest(
      'Ouch!',
      'I am in pain',
      'assets/Images/Pain.jpg'
    )
  ]);

  get departmentRequests() {
    return this._departmentRequests.asObservable();
  }

  constructor() {}
}
