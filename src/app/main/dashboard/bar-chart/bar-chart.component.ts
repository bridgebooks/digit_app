import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges {
  @Input('dataset') dataset: any[];
  constructor() { }

  getBarWidth(dataset: any) {
    const total = this.dataset.reduce((a, b) => +a + +b.value, 0);
    let width = (dataset.value / total) * 100;
    width = Math.round(width);

    return `${width}%`;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }
}
