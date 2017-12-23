import { ViewChild, Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Modal } from '@clr/angular';
import { PayrunFormComponent } from '../payrun-form/payrun-form.component';
import { SessionService, PayrunService } from '../../../services';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-payruns',
  templateUrl: './payruns.component.html',
  styleUrls: ['./payruns.component.scss']
})

export class PayrunsComponent implements OnInit, OnDestroy{

  @ViewChild('payrunModal') payrunModal: Modal;
  @ViewChild('form') periodForm: PayrunFormComponent

  org: any;
  processing: boolean = false;
  cancel$: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private session: SessionService,
    private payruns: PayrunService) { }

  private formateDates(model: any) {
    model.start_date = model.start_date.formatted;
    model.end_date = model.end_date.formatted;
    model.payment_date = model.payment_date.formatted;
    return model;
  }

  submit() {
    this.processing = true;
    this.periodForm.model.org_id = this.org.id
    let model = this.formateDates(this.periodForm.model);

    this.payruns.create(model)
      .takeUntil(this.cancel$)
      .subscribe(response => {
        this.processing = false;
        this.router.navigate(['/payroll/runs', response.data.id]);
      }, 
      err => {
        this.processing = false;
      })
  }

  ngOnInit() {
    this.org = this.session.getDefaultOrg()

    this.payrunModal._openChanged
      .subscribe(open => {
        if (!open) {
          this.periodForm.form.reset();
          this.cancel$.next();
        }
      })
  }

  ngOnDestroy() {
    this.payrunModal._openChanged.unsubscribe();
  }
}
