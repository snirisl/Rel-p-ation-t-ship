import { Injectable } from '@angular/core';
import { Request } from './request.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, switchMap, take, map } from 'rxjs/operators';

interface RequestData {
  date: string;
  description: string;
  imgUrl: string;
  status: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private _requests = new BehaviorSubject<Request[]>([]);

  get requests() {
    return this._requests.asObservable();
  }

  fetchRequests() {
    return this.http
      .get<{ [key: string]: RequestData }>(
        'https://relpationtship-test.firebaseio.com/added-requests.json'
      )
      .pipe(
        map(resData => {
          const requests = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              requests.push(
                new Request(
                  key,
                  resData[key].title,
                  resData[key].description,
                  resData[key].imgUrl,
                  resData[key].status,
                  new Date(resData[key].date)
                )
              );
            }
          }
          return requests;
        }),
        tap(requests => {
          this._requests.next(requests);
        })
      );
  }

  add(request: Request) {

    let generatedId: string;
    const newRequest = new Request(
      request.id,
      request.title,
      request.description,
      request.imgUrl,
      'In progress',
      new Date()
    );
    return this.http
      .post<{ name: string }>(
        'https://relpationtship-test.firebaseio.com/added-requests.json',
        { ...newRequest, id: null }
      )
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this.requests;
        }),
        take(1),
        tap(requests => {
          newRequest.id = generatedId;
          this._requests.next(requests.concat(newRequest));
        })
      );
    // this._requests.push(newRequest);
  }
  constructor(private http: HttpClient) {}
}


// [
//   new Request(
//     'r1',
//     'Towel',
//     'Need new towel',
//     'https://www.enchantehome.com/wp-content/uploads/2018/06/types-of-towels-1024x684.jpeg',
//     'In progress',
//     new Date('2019-01-01')
//   ),
//   new Request(
//     'r2',
//     'Get up',
//     'Need help getting out of bed',
//     'https://www.dreams.co.uk/sleep-matters-club/wp-content/uploads/2015/11/shutterstock_228939076-2.jpg',
//     'In progress',
//     new Date('2019-01-01')
//   ),
//   new Request(
//     'r3',
//     'Shower',
//     'I want to take a shower',
//     'https://img-aws.ehowcdn.com/350x235p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/ba3c626a08e64d8e88284ab26f8f1f6e.jpg',
//     'Completed',
//     new Date('2019-01-01')
//   ),
//   new Request(
//     'r4',
//     'Ouch!',
//     'I am in pain',
//     'https://www.virtua.org/-/media/Images/Virtua%20Enterprise/Virtua%20Corporate/Virtua%20Site/Teaser/pain-management-teaser.ashx?bc=ffffff&as=1&h=299&la=en&w=629&hash=FF3F56E787C52D09C58C0A57E9AF6ABF32DE2D45',
//     'Completed',
//     new Date('2019-01-01')
//   )
// ]