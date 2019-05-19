import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { Users } from '../users/users.model';
import { Chart } from 'chart.js';
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
  @ViewChild('valueCommonCanvas') valueCommonCanvas;
  valueBarsChart: any;
  valueCommonChart: any;

  chartData = null;
  commonChartData = null;

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    // get Nurses list
    this.nurseRef = this.firestore.collection('added-users', ref =>
      ref.where('type', '==', 'n')
    );
    this.nurseRef.valueChanges().subscribe(result => {
      this.nurses = result;
    });

    // get Completed Requests
    this.ref = this.firestore.collection('requests', ref =>
      ref.where('status', '==', 'Completed')
    );
    this.ref.valueChanges().subscribe(result => {
      if (this.chartData) {
        this.updateCharts(result);
        this.updateCommonCharts(result);
      } else {
        this.createCharts(result);
        this.createCommonChart(result);
      }
    });
  }

  getReportValues() {
    let reportByNurse = {};
    let millisecondsPerHour = 1000 * 60 * 60;
    let counter;
    let sum;
    let avg;
    for (let nurse of this.nurses) {
      counter = 0;
      sum = 0;
      for (let request of this.chartData) {
        if (request.nurseName === nurse.name) {
          counter += 1;
          sum +=
            (request.completionDate.toDate() - request.date.toDate()) /
            millisecondsPerHour;
        }
      }
      avg = +(sum / counter).toFixed();
      reportByNurse[nurse.name] = avg;
    }
    return reportByNurse;
  }

  getCommonReport() {
    let reportCommonRequest = {};
    for (let request of this.commonChartData) {
      reportCommonRequest[request.title] = 0;
    }
    for (let request of this.commonChartData) {
      reportCommonRequest[request.title] += 1;
    }
    return reportCommonRequest;
  }

  async createCharts(data) {
    this.chartData = data;
    let colors = [];
    let i = 0;
    let chartData = await this.getReportValues();
    while (i < this.getObjectSize(chartData)) {
      colors.push(this.getRandomColor());
      i += 1;
    }
    this.valueBarsChart = new Chart(this.valueBarCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: Object.keys(chartData),
        datasets: [
          {
            data: Object.values(chartData),
            backgroundColor: colors
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false
              }
            }
          ]
        }
      }
    });
  }

  async createCommonChart(data) {
    this.commonChartData = data;
    let colors = [];
    let i = 0;
    let commonChartData = await this.getCommonReport();
    while (i < this.getObjectSize(commonChartData)) {
      colors.push(this.getRandomColor());
      i += 1;
    }
    this.valueCommonChart = new Chart(this.valueCommonCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: Object.keys(commonChartData),
        datasets: [
          {
            data: Object.values(commonChartData),
            backgroundColor: colors
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

  async updateCharts(data) {
    this.chartData = data;
    let chartData = await this.getReportValues();

    this.valueBarsChart.data.datasets.forEach(dataset => {
      dataset.data = Object.values(chartData);
    });
    this.valueBarsChart.update();
  }

  async updateCommonCharts(data) {
    this.commonChartData = data;
    let commonChartData = await this.getCommonReport();

    this.valueCommonChart.data.datasets.forEach(dataset => {
      dataset.data = Object.values(commonChartData);
    });
    this.valueCommonChart.update();
  }

  getRandomColor() {
    let letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getObjectSize(obj: {}) {
    let size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        size++;
      }
    }
    return size;
  }
}
