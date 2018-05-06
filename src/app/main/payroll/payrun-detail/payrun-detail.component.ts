import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Payrun } from '../../../models/data/payrun';
import { AlertService, PayrunService } from '../../../services/index';

@Component({
  selector: 'app-payrun-detail',
  templateUrl: './payrun-detail.component.html',
  styleUrls: ['./payrun-detail.component.scss']
})
export class PayrunDetailComponent implements OnInit, OnDestroy {

  loading: boolean = true;
  sending: boolean = false;
  saving: boolean = false;

  cancel$: Subject<any> = new Subject();
  route$: Subscription;

  run: Payrun;

  constructor(
    private router: Router,
    private alert: AlertService,
    private route: ActivatedRoute,
    private payruns: PayrunService
  ) { }

  isPaid() {
    return ['paid', 'voided'].indexOf(this.run.status) !== -1
      ? true
      : false;
  }

  send(id: string) {
    this.sending = true;

    this.payruns.send(id)
      .takeUntil(this.cancel$)
      .subscribe(response => {
        this.sending = false;
        this.alert.success('Send Payslips', response.message, { timeOut: 3000 });
      }, err => {
        this.sending = false;
      })
  }

  fetchPayrun(id: string, showLoading: boolean = true) {
    this.loading = showLoading ? true : false;

    const options = {
      include: 'payslips'
    }

    const payrun$ = this.payruns.get(id, options);

    payrun$
      .takeUntil(this.cancel$)
      .subscribe(response => {
        this.run = response.data;
      }, err => {
        this.loading = false;
      }, () => {
        this.loading = false;
      })
  }

  onPaid() {
    this.fetchPayrun(this.run.id, true);
  }

  ngOnInit() {
    this.route$ = this.route.params
      .filter(params => params.id)
      .subscribe(params => {
        this.fetchPayrun(params.id);
      });
  }

  ngOnDestroy() {
    this.route$.unsubscribe();
    this.cancel$.complete();
  }
}
