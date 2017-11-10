import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  @Input('total') total: number;

  fee: number = 45;

  charge: number;

  constructor() { }

  ngOnInit() {
    this.charge = Math.round(this.total + this.fee);
  }

}
