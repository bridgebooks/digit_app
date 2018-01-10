import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PayslipService, AlertService } from '../../../services/index';
import { Payslip } from '../../../models/data/payslip';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { PayslipItem } from '../../../models/data/payslip-item';
import { PayitemAmountInputComponent } from '../payitem-amount-input/payitem-amount-input.component';

enum PayItemType {
  WAGE = <any>'wage',
  TAX = <any>'tax',
  ALLOWANCE = <any>'allowance',
  DEDUCTION = <any>'deduction',
  REIMBURSEMENT = <any>'reimbursement'
}

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.scss']
})
export class PayslipComponent implements OnInit, OnDestroy {

  loading: boolean = true;
  sending: boolean = false;
  slip: Payslip;
  earnings: PayslipItem[];
  deductions: PayslipItem[];
  cancel$: Subject<any> = new Subject();
  route$: Subscription;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alerts: AlertService,
    private payslipService: PayslipService
  ) { }

  private getEarnings(items: PayslipItem[]) {
    return items.filter(item => {
      return [ PayItemType.TAX, PayItemType.DEDUCTION ].indexOf(<any>item.item.data.pay_item_type) == -1
    })
  }

  private getDeductions(items: PayslipItem[]) {
    return items.filter(item => {
      return [ PayItemType.TAX, PayItemType.DEDUCTION ].indexOf(<any>item.item.data.pay_item_type) != -1 
    })
  }

  send(id: string) {
    this.sending = true;

    this.payslipService.send(id)
      .takeUntil(this.cancel$)
      .subscribe(response => {
        this.sending = false;
        this.alerts.success('Send Payslip', response.message, { timeOut: 3000 });
      }, err => {
        this.sending = false;
      })
  }

  fetchSlip(id: string) {
    this.loading = true;

    const options = {
      include: 'items,items.account,payrun'
    }

    this.payslipService.get(id, options)
      .takeUntil(this.cancel$)
      .subscribe(response => {
        this.slip = response.data;
        this.slip.deductions = Number(this.slip.tax) + Number(this.slip.deductions);
        this.earnings = this.getEarnings(this.slip.items.data);
        this.deductions = this.getDeductions(this.slip.items.data);
      }, err => {
        this.loading = false;
      }, () => {
        this.loading = false;
      })
  }

  ngOnInit() {
    this.route$ = this.route.params
      .filter(params => params.id)
      .subscribe(params => {
        this.fetchSlip(params.id);
      });
  }

  ngOnDestroy() {
    this.cancel$.complete();
    this.route$.unsubscribe();
  }
}
