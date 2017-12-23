import { Component, Input, Output, EventEmitter, SimpleChanges, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Payslip } from '../../../models/data/payslip';
import { Subject } from 'rxjs/Subject';

import { AlertService, PayslipService } from '../../../services';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PayslipItem } from '../../../models/data/payslip-item';
import * as _ from 'lodash';

import 'clarity-icons';
import 'clarity-icons/shapes/core-shapes';

enum PayItemType {
  WAGE = <any>'wage',
  ALLOWANCE = <any>'allowance',
  DEDUCTION = <any>'deduction',
  REIMBURSEMENT = <any>'reimbursement'
}

@Component({
  selector: 'app-payslip-editor',
  templateUrl: './payslip-editor.component.html',
  styleUrls: ['./payslip-editor.component.scss']
})

export class PayslipEditorComponent implements OnInit, OnChanges, OnDestroy {

  @Input('selected') slip: Payslip;
  @Output() payslipUpdated: EventEmitter<Payslip> = new EventEmitter();
  open$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  open: boolean = false;
  loading: boolean = false;
  gross_total: number = 0;
  net_total: number = 0;

  constructor(private alerts: AlertService, private payslips: PayslipService) { }

  onPayItemSelected($event: string, item: PayslipItem) {
    item.pay_item_id = $event;
  }

  onPayslipItemCreated($event, item) {
    item = _.merge(item, $event);
  }

  onPayItemAmountChanged($event, item: PayslipItem) {
    item.amount = $event;
    this.computeTotals()
  }

  removeLine(item) {
    let idx = this.slip.items.indexOf(item);

    if (item) {
      this.alerts.info('Deleting', 'Deleting item', { timeOut: 3000 })      
      this.payslips.deleteItem(item.id)
      .subscribe(response => {
        this.alerts.success('Deleting', 'Item deleted', { timeOut: 3000 })  
      })
    }

    this.slip.items.splice(idx, 1);
    this.computeTotals();
  }

  addLine() {
    const item: PayslipItem = {
      pay_slip_id: this.slip.id,
      pay_item_id: null,
      amount: 0,
      is_new: true
    }

    this.slip.items.push(item);
  }

  computeTotals() {
    let gross = 0;
    let less = 0;
    let allowances = this.slip.items.filter(item => {
      return <any>item.item.data.pay_item_type == PayItemType.ALLOWANCE;
    });

    let wages = this.slip.items.filter(item => {
      return <any>item.item.data.pay_item_type == PayItemType.WAGE;
    });

    let deductions = this.slip.items.filter(item => {
      return <any>item.item.data.pay_item_type == PayItemType.DEDUCTION;
    });

    let reimbursements = this.slip.items.filter(item => {
      return <any>item.item.data.pay_item_type == PayItemType.REIMBURSEMENT;
    });

    allowances
      .concat(wages, reimbursements)
      .map(item => {
        return Number(item.amount);
      })
      .map(amount => {
        gross = amount + gross;
      })
    
    deductions
      .map(item => {
        return Number(item.amount)
      })
      .map(amount => {
        less = amount + less;
      })
    
    this.gross_total = gross;
    this.net_total = this.gross_total - less;
    this.payslipUpdated.emit(this.slip);
  }

  fetchPayItems() {
    this.loading = true;
    this.payslips.payItems(this.slip.id, { include: 'item' })
      .subscribe(response => {
        this.loading = false;
        this.slip.items = response.data;
        this.computeTotals();
      }, err => {
        this.loading = false;
      });
  }

  ngOnInit() {
    this.open$.subscribe(open => {
      if (open) this.fetchPayItems();
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.slip.currentValue) {
      this.open = true;
      this.open$.next(true);
    }
  }

  ngOnDestroy() {
    this.open$.unsubscribe();
  }
}
