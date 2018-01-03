import { Component, Input, Output, EventEmitter, SimpleChanges, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Payslip } from '../../../models/data/payslip';
import { Subject } from 'rxjs/Subject';

import { AlertService, PayslipService } from '../../../services';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PayslipItem } from '../../../models/data/payslip-item';
import * as _ from 'lodash';

import '@clr/icons';
import '@clr/icons/shapes/core-shapes';
import { PayrunSettingsData } from '../../../models/responses/payrun-settings';
import { TaxUtils } from '../utils/tax';

enum PayItemType {
  WAGE = <any>'wage',
  TAX = <any>'tax',
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
  @Input('settings') settings: PayrunSettingsData;
  @Output() payslipUpdated: EventEmitter<Payslip> = new EventEmitter();
  open$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  open: boolean = false;
  loading: boolean = false;
  tax: TaxUtils.TaxResult = {
    tax: 0.00,
    taxable: 0.00,
    taxrate: 0.00,
    exemption: 0.00
  };
  wages: number = 0;
  deductions: number = 0;
  allowances: number = 0;
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
    this.computeTax();
    this.computeTotals()
    this.updateTotals()
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
    this.computeTax();
    this.computeTotals();
    this.updateTotals()
  }

  updateTaxPayitem(tax) {
    this.payslips.updateItem(tax.id, { amount: tax.amount })
      .subscribe(response => {
        this.alerts.success('Payslip', 'Payslip item updated', { timeOut: 3000 })
      }, err => {
      })
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

  computeTax(update: boolean = true) {
    let otherAllowances = 0;
    let basic = this.slip.items.filter(item => {
      return <any>item.item.data.id == this.settings.values.basic_wage_item
    })[0];

    let housing = this.slip.items.filter(item => {
      return <any>item.item.data.id == this.settings.values.housing_allowance_item
    })[0];

    let transport = this.slip.items.filter(item => {
      return <any>item.item.data.id == this.settings.values.transport_allowance_item
    })[0];

    let tax = this.slip.items.filter(item => {
      return <any>item.item.data.pay_item_type == PayItemType.TAX;
    })[0];

    let others = this.slip.items.filter(item => {
      return <any>item.item.data.pay_item_type == PayItemType.ALLOWANCE
        && <any>item.item.data.id != this.settings.values.housing_allowance_item
        && <any>item.item.data.id != this.settings.values.transport_allowance_item
    });
    
    others.forEach(item => {
      otherAllowances = otherAllowances + Number(item.amount);
    });

    const options = {
      basic: Number(basic.amount),
      housing: Number(housing.amount),
      transport: Number(transport.amount),
      others: otherAllowances
    }

    this.tax = TaxUtils.computeTax(options);
    // set tax amount
    tax.amount = this.tax.tax;
    // update tax pay item
    if (update) this.updateTaxPayitem(tax);
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

    let tax = this.slip.items.filter(item => {
      return <any>item.item.data.pay_item_type == PayItemType.TAX;
    })

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
      .concat(tax)
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

  updateTotals() {
    let allowances = this.slip.items.filter(item => {
      return <any>item.item.data.pay_item_type == PayItemType.ALLOWANCE;
    });

    let wages = this.slip.items.filter(item => {
      return <any>item.item.data.pay_item_type == PayItemType.WAGE;
    });

    let deductions = this.slip.items.filter(item => {
      return <any>item.item.data.pay_item_type == PayItemType.DEDUCTION;
    });

    allowances
      .map(item => {
        return Number(item.amount);
      })
      .map(amount => {
        this.allowances = amount + this.allowances;
      })
    
    deductions
      .map(item => {
        return Number(item.amount);
      })
      .map(amount => {
        this.deductions = amount + this.allowances;
      })
    
    wages
      .map(item => {
        return Number(item.amount);
      })
      .map(amount => {
        this.wages = amount + this.wages;
      })
    
    this.wages = this.allowances - this.deductions;
  }

  fetchPayItems() {
    this.loading = true;
    this.payslips.payItems(this.slip.id, { include: 'item' })
      .subscribe(response => {
        this.loading = false;
        this.slip.items = response.data;
        this.computeTax(false);
        this.computeTotals();
        this.updateTotals()
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
    if (changes) {
      if (changes.slip && changes.slip.currentValue) {
        this.open = true;
        this.open$.next(true);
      }
    }
  }

  ngOnDestroy() {
    this.open$.unsubscribe();
  }
}
