import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Chart } from 'chart.js';
import { reduce } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  chart: any;
  ctx;
  @ViewChild('canvas1') refCanvas1: ElementRef;
  isDrawing: boolean = false;
  apiErrorMsg: string;


  arrCovidTimelineData = [];
  arrGetTotalCasesData1 = [];
  arrDates = [];
  dataPoints = [];
  labels = [];

  apiSub: Subscription;


  constructor(private dashboardService: DashboardService) { }

  //---------Chart Properties-----------------------
  /* chartOptions = {
    responsive: true
  };
  yAxis = [1, 1, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 28, 30, 31, 34, 39, 43, 56, 62, 73, 82, 102, 113, 119, 142, 156, 194, 244, 330, 396, 499, 536, 657, 727, 887, 987, 1024, 1251, 1397, 1998, 2567, 2567, 3082, 3588, 4778, 5311, 5916, 6725, 7598, 8446, 9205, 10453, 11487, 12322, 12759, 14352, 15722, 17615, 18539, 20080, 21370, 23039, 24447, 26283, 27890, 29451, 31360, 33062];
  xAxis = [1, 1, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 28, 30, 31, 34, 39, 43, 56, 62, 73, 82, 102, 113, 119, 142, 156, 194, 244, 330, 396, 499, 536, 657, 727, 887, 987, 1024, 1251, 1397, 1998, 2567, 2567, 3082, 3588, 4778, 5311, 5916, 6725, 7598, 8446, 9205, 10453, 11487, 12322, 12759, 14352, 15722, 17615, 18539, 20080, 21370, 23039, 24447, 26283, 27890, 29451, 31360, 33062];
  chartData = [{ data: this.yAxis, label: 'INDIA', borderColor: 'blue' }];
  chartLabels = this.xAxis; */
  //-------------------------------------------------  

  ngOnInit(): void {
    alert('Dashboard Loaded');
    this.drawCovidComparisonLineChart();
  }

  ngOnDestroy() {
    this.apiSub.unsubscribe();
    console.log('Unsubscribed');
  }

  drawCovidComparisonLineChart() {
    this.isDrawing = true;
    this.apiSub = this.dashboardService.getTimelineDataByCountry().subscribe(arrData => {
      this.isDrawing = false;
      this.arrCovidTimelineData = arrData;
      this.arrGetTotalCasesData1 = this.dashboardService.GetTotalCasesFromJsonArray(this.arrCovidTimelineData);
      this.arrDates = this.dashboardService.GetDatesFromJsonArray(this.arrCovidTimelineData);
      //-----------------Chart Draw Section------------------------------------   
      this.ctx = this.refCanvas1.nativeElement.getContext('2d');
      this.chart = new Chart(this.ctx, {
        type: 'line',
        data: {
          labels: this.arrDates,
          datasets: [
            {
              data: this.arrGetTotalCasesData1,
              fill: false,
              borderColor: '#3cba9f'
            }
          ]
        },
        options: {
          legend: {
            display: true,
          },
          scales: {
            xAxes: [{ display: true }],
            yAxes: [{ display: true }]
          }
        }
      }
      );
      //---------------------------------------------------------------------------      
    },
      error => {
        this.apiErrorMsg = error.message;
        this.isDrawing = false;
      }
    )
  }
}
