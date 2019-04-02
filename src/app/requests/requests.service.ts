import { Injectable } from '@angular/core';
import { Request } from './request.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private _requests: Request[] = [
    {
      id: 'r1',
      title: 'Towel',
      description: 'Need new towel',
      imgUrl:
        'https://www.enchantehome.com/wp-content/uploads/2018/06/types-of-towels-1024x684.jpeg',
      status: 'In progress',
      date: ''
    },
    {
      id: 'r2',
      title: 'Get up',
      description: 'Need help getting out of bed',
      imgUrl:
        'https://www.dreams.co.uk/sleep-matters-club/wp-content/uploads/2015/11/shutterstock_228939076-2.jpg',
      status: 'In progress',
      date: ''
    },
    {
      id: 'r3',
      title: 'Shower',
      description: 'I want to take a shower',
      imgUrl:
        'https://img-aws.ehowcdn.com/350x235p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/ba3c626a08e64d8e88284ab26f8f1f6e.jpg',
      status: 'Completed',
      date: ''
    },
    {
      id: 'r4',
      title: 'Ouch!',
      description: 'I am in pain',
      imgUrl:
        'https://www.virtua.org/-/media/Images/Virtua%20Enterprise/Virtua%20Corporate/Virtua%20Site/Teaser/pain-management-teaser.ashx?bc=ffffff&as=1&h=299&la=en&w=629&hash=FF3F56E787C52D09C58C0A57E9AF6ABF32DE2D45',
      status: 'Completed',
      date: ''
    }
  ];

  getRequests(): Observable<Request[]> {
    return of(this._requests);
  }

  add(request: Request) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const hh = String(today.getHours()).padStart(2, '0');
    const min = String(today.getMinutes()).padStart(2, '0');
    const newDate = mm + '/' + dd + ', ' + hh + ':' + min;
    const newRequest = new Request(
      request.id,
      request.title,
      request.description,
      request.imgUrl,
      'In progress',
      newDate
    );
    this._requests.push(newRequest);
  }
  constructor() {}
}
