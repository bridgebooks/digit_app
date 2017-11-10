import { Component, Input, OnInit } from '@angular/core';

import 'clarity-icons';
import 'clarity-icons/shapes/commerce-shapes';

@Component({
  selector: 'payment-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  @Input('invoice_no') invoice_no: string;
  
  constructor() { }

  ngOnInit() {
  }

}
