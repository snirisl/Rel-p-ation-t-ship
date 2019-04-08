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
      'https://www.enchantehome.com/wp-content/uploads/2018/06/types-of-towels-1024x684.jpeg'
    ),
    new StaticRequest(
      'Get up',
      'Need help getting out of bed',
      'https://www.dreams.co.uk/sleep-matters-club/wp-content/uploads/2015/11/shutterstock_228939076-2.jpg'
    ),
    new StaticRequest(
      'Shower',
      'I want to take a shower',
      'https://img-aws.ehowcdn.com/350x235p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/ba3c626a08e64d8e88284ab26f8f1f6e.jpg'
    ),
    new StaticRequest(
      'Ouch!',
      'I am in pain',
      'https://www.virtua.org/-/media/Images/Virtua%20Enterprise/Virtua%20Corporate/Virtua%20Site/Teaser/pain-management-teaser.ashx?bc=ffffff&as=1&h=299&la=en&w=629&hash=FF3F56E787C52D09C58C0A57E9AF6ABF32DE2D45'
    )
  ]);

  get departmentRequests() {
    return this._departmentRequests.asObservable();
  }

  constructor() {}
}
