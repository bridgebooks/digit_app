import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges {
  @Input('dataset') dataset: any[];
  @Input('total') total: number;
  constructor() { }

  setBarSizes(total: number) {
    this.dataset.forEach(set => {
      set.size = `${Math.round((set.value / total) * 100)}%`;
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.total = changes.total ? changes.total.currentValue : this.total;
    if (this.total > 0) this.setBarSizes(this.total);
  }
}
