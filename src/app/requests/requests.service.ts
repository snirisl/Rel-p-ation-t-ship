import { Injectable } from '@angular/core';
import { Request } from './request.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, switchMap, take, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

interface RequestData {
  date: string;
  description: string;
  imgUrl: string;
  status: string;
  title: string;
  patientId: string;
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
    if (this.authService.userType === 'p') {
      return this.authService.userId.pipe(
        switchMap(userId => {
          if (!userId) {
            throw new Error('User not found');
          }
          return this.http.get<{ [key: string]: RequestData }>(
            `https://relpationtship-test.firebaseio.com/added-requests.json?orderBy="patientId"&equalTo="${userId}"`
          );
        }),
        map(patientRequestsData => {
          console.log(patientRequestsData);
          const patientRequests = [];
          for (const key in patientRequestsData) {
            if (patientRequestsData.hasOwnProperty(key)) {
              patientRequests.push(
                new Request(
                  key,
                  patientRequestsData[key].title,
                  patientRequestsData[key].description,
                  patientRequestsData[key].imgUrl,
                  patientRequestsData[key].status,
                  new Date(patientRequestsData[key].date),
                  patientRequestsData[key].patientId
                )
              );
            }
          }
          return patientRequests;
        }),
        tap(patientRequests => {
          this._requests.next(patientRequests);
        })
      );
    } else {
      return this.http
        .get<{ [key: string]: RequestData }>(
          `https://relpationtship-test.firebaseio.com/added-requests.json`
        )
        .pipe(
          map(patientRequestsData => {
            const patientRequests = [];
            for (const key in patientRequestsData) {
              if (patientRequestsData.hasOwnProperty(key)) {
                patientRequests.push(
                  new Request(
                    key,
                    patientRequestsData[key].title,
                    patientRequestsData[key].description,
                    patientRequestsData[key].imgUrl,
                    patientRequestsData[key].status,
                    new Date(patientRequestsData[key].date),
                    patientRequestsData[key].patientId
                  )
                );
              }
            }
            return patientRequests;
          }),
          tap(patientRequests => {
            this._requests.next(patientRequests);
          })
        );
    }
  }

  add(request: Request) {
    let generatedId: string;
    let newRequest: Request;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        if (!userId) {
          throw new Error('No user id found!');
        }
        newRequest = new Request(
          request.id,
          request.title,
          request.description,
          request.imgUrl,
          'In progress',
          new Date(),
          userId
        );
        return this.http.post<{ name: string }>(
          'https://relpationtship-test.firebaseio.com/added-requests.json',
          { ...newRequest, id: null }
        );
      }),
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
  constructor(private http: HttpClient, private authService: AuthService) {}

  setRequestAsCompleted(requestId: string) {
    let updatedRequests: Request[];
    return this.requests.pipe(
      take(1),
      switchMap(requests => {
        const updatedRequestIndex = requests.findIndex(
          req => req.id === requestId
        );
        updatedRequests = [...requests];
        const oldRequest = updatedRequests[updatedRequestIndex];
        updatedRequests[updatedRequestIndex] = new Request(
          oldRequest.id,
          oldRequest.title,
          oldRequest.description,
          oldRequest.imgUrl,
          'Completed',
          oldRequest.date,
          oldRequest.patientId
        );
        console.log(
          `https://relpationtship-test.firebaseio.com/added-requests/${requestId}.json`
        );
        return this.http.put(
          `https://relpationtship-test.firebaseio.com/added-requests/${requestId}.json`,
          { ...updatedRequests[updatedRequestIndex], id: null }
        );
      }),
      tap(() => {
        this._requests.next(updatedRequests);
      })
    );
  }
}
