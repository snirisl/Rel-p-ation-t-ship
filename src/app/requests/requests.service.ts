import { Injectable } from '@angular/core';
import { Request } from './request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
  completionDate?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private _requests = new BehaviorSubject<Request[]>([]);
  requestCollection: AngularFirestoreCollection<RequestData>;
  requestDoc: AngularFirestoreDocument<RequestData>;
  currentUser: string;
  roomsUpdateRequestsCollection: AngularFirestoreCollection<RequestData>;

  constructor(
    private authService: AuthService,
    public firestore: AngularFirestore
  ) {}

  getRequests() {
    this.requestCollection = this.firestore.collection('requests', ref =>
      ref.orderBy('date', 'desc')
    );
    return this.requestCollection.valueChanges();
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
      nurseName: this.authService.userName,
      completionDate: new Date()
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
        patientName: this.authService.userName,
        nurseId: '',
        room: '103',
        id: id
      });
  }
}
