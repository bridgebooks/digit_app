import { Component, Input, SimpleChanges, OnInit, OnChanges } from '@angular/core';
import { Payslip } from 'app/models/data/payslip';
import { Subject } from 'rxjs/Subject';

import 'clarity-icons';
import 'clarity-icons/shapes/core-shapes';

@Component({
  selector: 'app-payslip-editor',
  templateUrl: './payslip-editor.component.html',
  styleUrls: ['./payslip-editor.component.scss']
})
export class PayslipEditorComponent implements OnInit, OnChanges {

  @Input('selected') slip: Payslip;


  open: boolean = false;

  constructor() { }

  ngOnInit() {
   
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.slip.currentValue) this.open = true;
  }
}
