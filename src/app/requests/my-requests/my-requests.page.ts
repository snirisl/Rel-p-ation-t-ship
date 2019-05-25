import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { RequestsService, RequestData } from '../requests.service';
import {
  IonItemSliding,
  IonSegment,
  LoadingController,
  ToastController
} from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Users } from 'src/app/users/users.model';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.page.html',
  styleUrls: ['./my-requests.page.scss']
})
export class MyRequestsPage implements OnInit {
  status = 'progress';
  requests$: Observable<RequestData[]>;
  curr_user$: Observable<Users>;
  assignedRooms: string[];
  isLoading: Promise<boolean>;
  @ViewChild(IonSegment) segment: IonSegment;

  constructor(
    private requestsService: RequestsService,
    private loadingCtrl: LoadingController,
    public authService: AuthService,
    public firestore: AngularFirestore,
    private toastCtrl: ToastController,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log('ngoninit my-requests');
    this.segment.value = 'progress';
    this.requests$ = this.requestsService.getRequests();
    this.curr_user$ = this.authService.getCurrUser();
    this.curr_user$.subscribe(x => {
      this.assignedRooms = x.rooms;
      console.log('assigned rooms are: ' + this.assignedRooms);
      this.isLoading = Promise.resolve(true);
      console.log('is loading: ' + this.isLoading);
    });
  }
  onFilterUpdate(event: any) {
    const filteredOption = event.detail.value;
    this.status = filteredOption;
  }

  setAsCompleted(slidingItem: IonItemSliding, request: RequestData) {
    slidingItem.close();
    this.loadingCtrl
      .create({
        message: 'Setting Request as Completed...'
      })
      .then(loadingEl => {
        loadingEl.present();
        this.requestsService.updateRequest(request).then(() => {
          loadingEl.dismiss();
          this.presentToast();
        });
      });
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Request Completed Successfully.',
      duration: 3000,
      color: 'secondary'
    });
    toast.present();
  }
}
