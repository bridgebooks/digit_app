import { ViewChild, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PayrunService, SessionService, EventbusService, OrgService } from '../../../services';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Payrun } from '../../../models/data/payrun';
import { PayslipEditorComponent } from '../../../main/payroll/payslip-editor/payslip-editor.component';
import { Payslip } from '../../../models/data/payslip';
import { PayitemFormModalComponent } from '../../settings/payitem-form-modal/payitem-form-modal.component';
import { Observable } from 'rxjs/Observable';
import { mergeMap } from 'rxjs/operators';
import { PayrunSettingsData } from '../../../models/responses/payrun-settings';

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
  settings: PayrunSettingsData;
  selected: Payslip;

  constructor(
    private eventBus$: EventbusService,
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionService,
    private orgService: OrgService,
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

  review() {
    this.router.navigate(['/payroll/runs/', this.run.id, 'review']);
  }
  
  fetchPayrun(id: string, showLoading: boolean = true) {
    this.loading = showLoading ? true : false;
    
    let options = {
      include: 'payslips'
    }

    let payrun$ = this.payruns.get(id, options);
    let settings$ = this.orgService.getPayrunSettings(this.org.id);

    settings$.pipe(
      mergeMap(response => {
        this.settings = response.data
        return payrun$;
      })
    ).subscribe(response => {
      this.run = response.data;
      this.loading = false;
    }, err => {
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
