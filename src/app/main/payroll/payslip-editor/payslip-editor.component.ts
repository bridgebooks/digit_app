import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import '@clr/icons/shapes/core-shapes';
import { merge } from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Payslip } from '../../../models/data/payslip';
import { PayslipItem } from '../../../models/data/payslip-item';
import { PayrunSettingsData } from '../../../models/responses/payrun-settings';
import { AlertService, PayslipService } from '../../../services';
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
    item = merge(item, $event);
  }

  onPayItemAmountChanged($event, item: PayslipItem) {
    item.amount = $event;
    this.computeTax();
    this.computeTotals()
    this.updateTotals()
  }

  removeLine(item) {
    const idx = this.slip.items.data.indexOf(item);

    if (item) {
      this.alerts.info('Deleting', 'Deleting item', { timeOut: 3000 })
      this.payslips.deleteItem(item.id)
      .subscribe(response => {
        this.alerts.success('Deleting', 'Item deleted', { timeOut: 3000 })
      })
    }

    this.slip.items.data.splice(idx, 1);
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

    this.slip.items.data.push(item);
  }

  computeTax(update: boolean = true) {
    let otherAllowances = 0;
    const basic = this.slip.items.data.filter(item => {
      return <any>item.item.data.id === this.settings.values.basic_wage_item
    })[0];

    const housing = this.slip.items.data.filter(item => {
      return <any>item.item.data.id === this.settings.values.housing_allowance_item
    })[0];

    const transport = this.slip.items.data.filter(item => {
      return <any>item.item.data.id === this.settings.values.transport_allowance_item
    })[0];

    const tax = this.slip.items.data.filter(item => {
      return <any>item.item.data.pay_item_type === PayItemType.TAX;
    })[0];

    const others = this.slip.items.data.filter(item => {
      return <any>item.item.data.pay_item_type === PayItemType.ALLOWANCE
        && <any>item.item.data.id !== this.settings.values.housing_allowance_item
        && <any>item.item.data.id !== this.settings.values.transport_allowance_item
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
    const allowances = this.slip.items.data.filter(item => {
      return <any>item.item.data.pay_item_type === PayItemType.ALLOWANCE;
    });

    const wages = this.slip.items.data.filter(item => {
      return <any>item.item.data.pay_item_type === PayItemType.WAGE;
    });

    const deductions = this.slip.items.data.filter(item => {
      return <any>item.item.data.pay_item_type === PayItemType.DEDUCTION;
    });

    const tax = this.slip.items.data.filter(item => {
      return <any>item.item.data.pay_item_type === PayItemType.TAX;
    })

    const reimbursements = this.slip.items.data.filter(item => {
      return <any>item.item.data.pay_item_type === PayItemType.REIMBURSEMENT;
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
    this.allowances = 0;
    this.wages = 0;
    this.deductions = 0;

    const allowances = this.slip.items.data.filter(item => {
      return <any>item.item.data.pay_item_type === PayItemType.ALLOWANCE;
    });

    const wages = this.slip.items.data.filter(item => {
      return <any>item.item.data.pay_item_type === PayItemType.WAGE;
    });

    const deductions = this.slip.items.data.filter(item => {
      return <any>item.item.data.pay_item_type === PayItemType.DEDUCTION;
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
        this.deductions = amount + this.deductions;
      })

    wages
      .map(item => {
        return Number(item.amount);
      })
      .map(amount => {
        this.wages = amount + this.wages;
      })
  }

  canShowItem(item: PayslipItem) {
    if (item.hasOwnProperty('is_new') || item.item && !item.item.data.is_system) return false;
    return true;
  }

  canDelete(item: PayslipItem) {
    if (item.hasOwnProperty('is_new')) return false;

    if ([
      this.settings.values.basic_wage_item,
      this.settings.values.housing_allowance_item,
      this.settings.values.transport_allowance_item
    ].indexOf(item.pay_item_id) !== -1) {
      return true;
    }
  }

  fetchPayItems() {
    this.loading = true;
    this.payslips.payItems(this.slip.id, { include: 'item' })
      .subscribe(response => {
        this.loading = false;
        this.slip.items = response;
        this.computeTax(false);
        this.computeTotals();
        this.updateTotals()
      }, err => {
        this.loading = false;
      });
  }

  ngOnInit() {
    this.open$.subscribe(open => {
      console.log(open);
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
