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
  nurseName?: string;
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
  roomsUpdateRequestsCollection: AngularFirestoreCollection<RequestData>;

  get requests() {
    return this._requests.asObservable();
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    public firestore: AngularFirestore
  ) {
    this.requestCollection = this.firestore.collection('requests', ref =>
      ref.orderBy('date', 'desc')
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
    let nurseId: string;
    this.authService.userId.subscribe(x => {
      nurseId = x;
    });
    this.requestDoc = this.firestore.doc(`requests/${request.id}`);
    return this.requestDoc.update({
      status: 'Completed',
      nurseId: nurseId,
      nurseName: this.authService.userName
    });
  }

  deleteRequest(request: RequestData) {
    this.requestDoc = this.firestore.doc(`requests/${request.id}
    `);
    return this.requestDoc.delete();
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
