import { ViewChild, Component, OnInit } from '@angular/core';
import { PieChartComponent } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-expensechart-widget',
  templateUrl: './expensechart-widget.component.html',
  styleUrls: ['./expensechart-widget.component.scss']
})
export class ExpensechartWidgetComponent implements OnInit {
  @ViewChild('chart') chart: PieChartComponent;
  data: any[] = [
    {
      "name": "Advertising",
      "value": 2000
    },
    {
      "name": "Internet Bills",
      "value": 3500
    },
    {
      "name": "Rent",
      "value": 7000
    }
  ]
  
  view: any[];
  
  constructor() { }

  ngOnInit() {
    console.log(this.chart);
  }
}
