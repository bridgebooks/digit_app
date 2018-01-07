import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PayrunService } from '../../../services/index';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Payrun } from '../../../models/data/payrun';

@Component({
  selector: 'app-payrun-review',
  templateUrl: './payrun-review.component.html',
  styleUrls: ['./payrun-review.component.scss']
})
export class PayrunReviewComponent implements OnInit, OnDestroy {
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

  approve() {
    this.saving = true;
    const notes = this.run.notes;

    this.payruns
      .approve(this.run.id, { notes })
      .takeUntil(this.cancel$)
      .subscribe(response => {
        this.router.navigate(['/payroll/runs'], { queryParams: { status: 'all' } })
      }, err => {
        this.saving = false;
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
