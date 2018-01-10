import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Payrun } from '../../../models/data/payrun';
import { PayrunService, AlertService } from '../../../services/index';

@Component({
  selector: 'app-payrun-detail',
  templateUrl: './payrun-detail.component.html',
  styleUrls: ['./payrun-detail.component.scss']
})
export class PayrunDetailComponent implements OnInit {

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
    
    let options = {
      include: 'payslips'
    }

    let payrun$ = this.payruns.get(id, options);

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
