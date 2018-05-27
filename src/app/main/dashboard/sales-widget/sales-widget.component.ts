import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-sales-widget',
  templateUrl: './sales-widget.component.html',
  styleUrls: ['./sales-widget.component.scss']
})
export class SalesWidgetComponent implements OnInit, AfterViewInit {

  canvas: any;
  ctx: any;
  chart: Chart;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.canvas = document.getElementById('sales-widget-chart');
    this.ctx = this.canvas.getContext('2d');

    this.chart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: ['1 Mar', '4 Mar', '6 Mar', '10 Mar'],
        datasets: [
          {
            fill: 'rgba(220,220,220,0.2)',
            data: [0, 0, 81, 0],
            lineTension: 0,
            borderColor: 'green',
            pointRadius: 5
          },
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontSize: 14,
                padding: 20,
                callback: function(value, index, values) {
                  return 'N' + value;
                }
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                maxTicksLimit: 6,
                autoSkip: true,
                fontSize: 14,
                padding: 15
              },
            }
          ]
        }
      }
    });
  }
}
