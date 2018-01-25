import { ViewChild, ElementRef, Component, OnInit, AfterContentInit } from '@angular/core';
import * as DataSource from './sample';
import { FusionChartsComponent } from 'angular4-fusioncharts/dist/src/fusioncharts/fusioncharts.component';

@Component({
  selector: 'app-recievables-widget',
  templateUrl: './recievables-widget.component.html',
  styleUrls: ['./recievables-widget.component.scss']
})
export class RecievablesWidgetComponent implements OnInit, AfterContentInit {

  @ViewChild('chartcontainer') chartContainerEl: ElementRef;
  @ViewChild('chartel') chartEl: FusionChartsComponent;
  chart: any = {
    type: 'area2d',
    dataFormat: 'json',
    dataSource: JSON.stringify(DataSource.source)
  }

  constructor() { }

  ngOnInit() {
    let width = this.chartEl.chartContainer.nativeElement.clientWidth;
    this.chartEl.width = width - (0.25 * width);
  }

  ngAfterContentInit() {
  }
}
