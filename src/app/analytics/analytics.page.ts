import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { FirebaseFirestore } from '@angular/fire';
import { ToastController } from '@ionic/angular';
import { Users } from '../users/users.model';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss']
})
export class AnalyticsPage implements OnInit {
  data: Observable<any[]>;
  ref: AngularFirestoreCollection<any>;
  nurseRef: AngularFirestoreCollection<any>;
  nurses: Users[];

  @ViewChild('valueBarsCanvas') valueBarCanvas;
  valueBarsChart: any;

  chartData = null;

  constructor(
    private firestore: AngularFirestore,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  ionViewDidLoad() {
    this.nurseRef = this.firestore.collection('added-users', ref => ref.where('type','==','n'));
    this.nurseRef.valueChanges().subscribe(result => {
      this.nurses = result;
    });
    this.ref = this.firestore.collection('requests', ref =>
      ref.where('status', '==', 'Completed').orderBy('nurseName', 'asc')
    );
    this.ref.valueChanges().subscribe(result => {
      if (this.chartData) {
        this.updateCharts(result);
      } else {
        this.createCharts(result);
      }
    });
  }

  getReportValues() {
    let reportByNurse = [];
    let counter = 0;
    let sum = 0;
    let avg;
    for (let nurse of this.nurses) {
      for (let request of this.chartData) {
        if (request.nurseName === nurse.name) {
          counter += 1;
          sum += (request.completionDate - request.date);
        }
      }
      avg = sum / counter;
      reportByNurse[nurse.name] = avg;
    }
  }

  createCharts(data) {

  }

  updateCharts(data) {

  }
}
