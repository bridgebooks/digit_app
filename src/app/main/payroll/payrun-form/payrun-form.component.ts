import { ViewChild, Component, OnInit, OnDestroy } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'payrun-form',
  templateUrl: './payrun-form.component.html',
  styleUrls: ['./payrun-form.component.scss']
})
export class PayrunFormComponent implements OnInit, OnDestroy {

  @ViewChild('form') form: ControlContainer;
 
  datepickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd'
  }
  model: any = {
    start_date: null,
    end_date: null,
    payment_date: null,
    status: 'draft'
  }

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
