import { Component, OnInit } from '@angular/core';
import * as DataSource from './sample';

@Component({
  selector: 'app-invoices-widget',
  templateUrl: './invoices-widget.component.html',
  styleUrls: ['./invoices-widget.component.scss']
})
export class InvoicesWidgetComponent implements OnInit {

  chart: any = {
    type: 'doughnut2d',
    dataFormat: 'json',
    dataSource: JSON.stringify(DataSource.source)
  }

  constructor() { }

  ngOnInit() {
  }

}
