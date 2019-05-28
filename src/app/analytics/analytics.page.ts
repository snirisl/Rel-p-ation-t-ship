import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { Users } from '../users/users.model';
import { Chart } from 'chart.js';
import { switchMap } from 'rxjs/operators';
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
    this.firestore
      .collection('added-users', ref => ref.where('type', '==', 'n'))
      .valueChanges()
      .pipe(
        switchMap((nurses: Users[]) => {
          this.nurses = nurses;
          return this.firestore
            .collection('requests', ref =>
              ref.where('status', '==', 'Completed')
            )
            .valueChanges();
        })
      )
      .subscribe(result => {
        if (this.chartData) {
          this.updateCharts(result);
        } else {
          this.createCharts(result);
        }
        if (this.commonChartData) {
          this.updateCommonCharts(result);
        } else {
          this.createCommonChart(result);
        }
      });
  }

  getReportValues() {
    const reportByNurse = {};
    const millisecondsPerHour = 1000 * 60 * 60;
    let counter: number;
    let sum: number;
    let avg: number;
    for (const nurse of this.nurses) {
      counter = 0;
      sum = 0;
      for (const request of this.chartData) {
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
    const reportCommonRequest = {};
    for (const request of this.commonChartData) {
      reportCommonRequest[request.title] = 0;
    }
    for (const request of this.commonChartData) {
      reportCommonRequest[request.title] += 1;
    }
    return reportCommonRequest;
  }

  async createCharts(data) {
    this.chartData = data;
    const colors = [];
    let i = 0;
    const chartData = await this.getReportValues();
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
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

  async createCommonChart(data) {
    this.commonChartData = data;
    const colors = [];
    let i = 0;
    const commonChartData = await this.getCommonReport();
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
    const chartData = await this.getReportValues();

    this.valueBarsChart.data.datasets.forEach(dataset => {
      dataset.data = Object.values(chartData);
    });
    this.valueBarsChart.update();
  }

  async updateCommonCharts(data) {
    this.commonChartData = data;
    const commonChartData = await this.getCommonReport();

    this.valueCommonChart.data.datasets.forEach(dataset => {
      dataset.data = Object.values(commonChartData);
    });
    this.valueCommonChart.update();
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getObjectSize(obj: {}) {
    let size = 0,
      key: any;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        size++;
      }
    }
    return size;
  }

  exit() {
    window.location.reload();
  }
}
