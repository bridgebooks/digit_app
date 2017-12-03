import { ViewChild, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PayrunService } from 'app/services';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Payrun } from 'app/models/data/payrun';
import { PayslipEditorComponent } from 'app/main/payroll/payslip-editor/payslip-editor.component';
import { Payslip } from 'app/models/data/payslip';

@Component({
  selector: 'app-payrun',
  templateUrl: './payrun.component.html',
  styleUrls: ['./payrun.component.scss']
})
export class PayrunComponent implements OnInit, OnDestroy {

  @ViewChild('payslipPanel') payslipPanel: PayslipEditorComponent
  loading: boolean;
  route$: Subscription;
  cancel$: Subject<any> = new Subject();

  run: Payrun;
  selected: Payslip;

  constructor(
    private route: ActivatedRoute,
    private payruns: PayrunService) { }

  openSlipEditor(slip) {
    this.selected = slip;
  }
  
  fetchPayrun(id: string) {
    this.loading = true;
    
    let options = {
      include: 'payslips'
    }

    this.payruns.get(id, options)
      .takeUntil(this.cancel$)
      .subscribe(response => {
        this.loading = false;
        this.run = response.data;
      },
      err => {
        this.loading = false;
      })
  }

  ngOnInit() {
    this.route$ = this.route.params
      .filter(params => params.id)
      .takeUntil(this.cancel$)
      .subscribe(params => {
        this.fetchPayrun(params.id);
      });
  }

  ngOnDestroy() {
    this.route$.unsubscribe();
    this.cancel$.complete();
  }
}
