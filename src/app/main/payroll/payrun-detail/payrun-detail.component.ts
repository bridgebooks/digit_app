import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Payrun } from '../../../models/data/payrun';
import { PayrunService } from '../../../services/index';

@Component({
  selector: 'app-payrun-detail',
  templateUrl: './payrun-detail.component.html',
  styleUrls: ['./payrun-detail.component.scss']
})
export class PayrunDetailComponent implements OnInit {

  loading: boolean = true;
  saving: boolean = false;

  cancel$: Subject<any> = new Subject();
  route$: Subscription;

  run: Payrun;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private payruns: PayrunService
  ) { }

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
