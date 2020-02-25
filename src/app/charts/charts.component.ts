import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, Chart } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { WebsocketService } from '../services/websocket.service';
import { debounceTime } from 'rxjs/operators';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  private url = 'ws://localhost:8088';
  public chartValues = [];
  public messages = [];
  public min: Date = new Date();
  public max = [];
  lineChartData : ChartDataSets[] = [{data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices'}];
  public chart : Chart;

  

  constructor(private wsService: WebsocketService) {
    wsService.createObservableSocket(this.url).pipe(debounceTime(100))
       .subscribe(m => {
           const item: any = JSON.parse(m);
           
           item.time = new Date(item.time) ;
           item.time = formatDate(item.time, ' hh:mm:ss a', 'en-US', '+0530');
           if (item.value) {
           this.chartValues = [...this.chartValues, item.value];
           this.max = [... this.max,item.time];
           if (this.chartValues.length > 20) {
               this.min = this.chartValues[this.chartValues.length - 20].time;
              //  this.max = this.max.slice(1,this.max.length);
              //  this.chartValues= this.chartValues.slice(1,this.chartValues.length);
              this.max.shift();
              this.chartValues.shift();
           }
           } else {
           this.messages = [...this.messages, item];
           }
          //  this.lineChartData = [{data: this.chartValues, label: 'Crude oil prices'}];
           this.chart.data.datasets[0].data = this.chartValues;
           this.chart.data.labels = this.max;
           this.chart.update();
           console.log(this.max);
       });
   }

  ngOnInit() {
    
    this.chart = new Chart('lineChart', {
      type: 'line',
      
      data: {
        labels: this.max,
        datasets: [{
          data: this.chartValues,
          borderWidth: 0,
          borderColor:'#00c0ef',
          label: 'liveCount',
          type : 'line',
          pointRadius : 0
        }]
      },
      options: {
        plugins: {
          filler: {
              propagate: true
          }
        
        },
        elements: {
          line: {
              tension: 0 // disables bezier curves
          }
        },
        animation : {
          easing : 'easeInOutBounce',
          duration : 0
        },
        responsive: true,
        title: {
          display: true,
          text: "APPLE STOCK ",
        },
        legend: {
          display: false
        },
        tooltips :{
          enabled : true,
          mode: 'y'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            }
          }],
          xAxes: [{
            // type: 'time',
            time: {
              displayFormats: {
                second: 'h:mm:ss a'
              },
              minUnit : 'second'
            },
            ticks :{
              source : 'auto',
              stepSize : 1.5
            }
          }]
        }
      }
    });
    // this.chart.render();
  }
  
  // lineChartData: ChartDataSets[] = [
  //   { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  // ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  // lineChartData : ChartDataSets[] = [{data: this.chartValues, label: 'Crude oil prices'}];
  // console.log(this.chartValues);
  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line'; 

}
