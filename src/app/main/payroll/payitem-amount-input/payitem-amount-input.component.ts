import { Component, Input, Output, EventEmitter, SimpleChanges, OnInit, OnChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { PayslipService, AlertService } from '../../../services';

@Component({
  selector: 'payitem-amount-input',
  templateUrl: './payitem-amount-input.component.html',
  styleUrls: ['./payitem-amount-input.component.scss']
})
export class PayitemAmountInputComponent implements OnInit, OnChanges {

  @Input('item') selected;
  @Output() amountChanged: EventEmitter<any> = new EventEmitter();
  input$: Subject<string> = new Subject();
  disabled: boolean = false;

  constructor(private payslips: PayslipService, private alert: AlertService) { }

  update(value) {
    this.disabled = true;
    console.log(this.selected);
    this.payslips.updateItem(this.selected.id, { amount: value })
      .subscribe(response => {
        this.disabled = false;
        this.alert.success('Payslip', 'Payslip item updated', { timeOut: 3000 })
        this.amountChanged.emit(value)
      }, err => {
        this.disabled = false;
      })
  }

  ngOnInit() {
    this.input$
      .distinctUntilChanged()
      .subscribe(value => {
        this.update(value);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.selected = changes.item ? changes.item.currentValue : this.selected;
  }
}
