import { Injectable } from '@angular/core';
import { Request } from './request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, switchMap, take, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import {
  AngularFirestoreCollection,
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { StaticRequest } from './static-requests.model';

export interface RequestData {
  date: Date;
  description: string;
  imgUrl: string;
  status: string;
  title: string;
  patientId: string;
  nurseId: string;
  room: string;
  id?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private _requests = new BehaviorSubject<Request[]>([]);
  requestCollection: AngularFirestoreCollection<RequestData>;
  patientsRequests: Observable<any[]>;
  requestDoc: AngularFirestoreDocument<RequestData>;
  currentUser: string;

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
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    public firestore: AngularFirestore
  ) {
    this.requestCollection = this.firestore.collection('requests', ref =>
      ref.orderBy('date', 'asc')
    );
    this.patientsRequests = this.requestCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as RequestData;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  getRequests() {
    return this.patientsRequests;
  }

  updateRequest(request: RequestData) {
    console.log(request.id);
    this.requestDoc = this.firestore.doc(`requests/${request.id}`);
    return this.requestDoc.update({ status: 'Completed' });
  }

  deleteRequest(request: RequestData) {
    this.requestDoc = this.firestore.doc(`requests/${request.id}
    `);
    this.requestDoc.delete();
  }

  addRequest(newAddedRequest: StaticRequest) {
    this.authService.userId.subscribe(userId => {
      this.currentUser = userId;
    });
    const id = this.firestore.createId();
    return this.firestore
      .collection('requests')
      .doc(id)
      .set({
        date: new Date(),
        description: newAddedRequest.description,
        imgUrl: newAddedRequest.imgUrl,
        status: 'In progress',
        title: newAddedRequest.title,
        patientId: this.currentUser,
        nurseId: '',
        room: '103'
      });
  }

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
