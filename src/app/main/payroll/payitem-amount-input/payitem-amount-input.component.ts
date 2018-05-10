import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { AlertService, PayslipService } from '../../../services';

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
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(value => {
        this.update(value);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.selected = changes.item ? changes.item.currentValue : this.selected;
  }
}
