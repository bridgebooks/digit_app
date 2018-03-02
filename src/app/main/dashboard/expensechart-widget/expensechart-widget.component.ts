import { ViewChild, Component, OnInit } from '@angular/core';
import * as DataSource from './sample';
import { FusionChartsComponent } from 'angular4-fusioncharts/dist/src/fusioncharts/fusioncharts.component';

@Component({
  selector: 'app-expensechart-widget',
  templateUrl: './expensechart-widget.component.html',
  styleUrls: ['./expensechart-widget.component.scss']
})
export class ExpensechartWidgetComponent implements OnInit {

  @ViewChild('chartel') chartEl: FusionChartsComponent
  chart: any = {
    type: 'doughnut2d',
    dataFormat: 'json',
    dataSource: JSON.stringify(DataSource.source)
  }

  constructor() { }

  ngOnInit() {
  }
}
