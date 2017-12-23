import { ViewChild, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PayrunService, SessionService, EventbusService } from '../../../services';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Payrun } from '../../../models/data/payrun';
import { PayslipEditorComponent } from '../../../main/payroll/payslip-editor/payslip-editor.component';
import { Payslip } from '../../../models/data/payslip';
import { PayitemFormModalComponent } from '../../settings/payitem-form-modal/payitem-form-modal.component';

@Component({
  selector: 'app-payrun',
  templateUrl: './payrun.component.html',
  styleUrls: ['./payrun.component.scss']
})
export class PayrunComponent implements OnInit, OnDestroy {

  @ViewChild('payslipPanel') payslipPanel: PayslipEditorComponent
  @ViewChild('payitemModal') payitemModal: PayitemFormModalComponent;
  org: any;
  loading: boolean;
  route$: Subscription;
  cancel$: Subject<any> = new Subject();

  run: Payrun;
  selected: Payslip;

  constructor(
    private eventBus$: EventbusService,
    private route: ActivatedRoute,
    private session: SessionService,
    private payruns: PayrunService) { }
  
  updateTotals(id: string) {
    this.fetchPayrun(id, false);
  }

  onPayslipUpdate($event: Payslip) {
    this.updateTotals($event.pay_run_id)
  }

  payItemAdded($event) {
    this.eventBus$.broadcast('payitem-modal:created', $event);
  }

  openSlipEditor(slip) {
    this.selected = slip;
  }
  
  fetchPayrun(id: string, showLoading: boolean = true) {
    this.loading = showLoading ? true : false;
    
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
    this.org = this.session.getDefaultOrg();

    this.route$ = this.route.params
      .filter(params => params.id)
      .takeUntil(this.cancel$)
      .subscribe(params => {
        this.fetchPayrun(params.id);
      });
    
    this.eventBus$.subscribe('payitem-modal:open', payload => {
      this.payitemModal.open();
    })
  }

  ngOnDestroy() {
    this.route$.unsubscribe();
    this.cancel$.complete();
    // this.eventBus$.unsubscribe();
  }
}
