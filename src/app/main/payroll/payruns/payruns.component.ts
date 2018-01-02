import { 
  ViewChild, 
  ViewContainerRef, 
  ComponentRef,
  ComponentFactoryResolver, 
  ComponentFactory,
  Component, 
  OnInit, 
  OnDestroy 
} from '@angular/core';
import { Router } from '@angular/router';
import { Modal } from '@clr/angular';
import { PayrunFormComponent } from '../payrun-form/payrun-form.component';
import { SessionService, PayrunService, OrgService } from '../../../services';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PayrunSettings, PayrunSettingsData } from '../../../models/responses/payrun-settings';
import { SetupModalComponent } from '../setup-modal/setup-modal.component';

@Component({
  selector: 'app-payruns',
  templateUrl: './payruns.component.html',
  styleUrls: ['./payruns.component.scss']
})

export class PayrunsComponent implements OnInit, OnDestroy{

  @ViewChild('payrunModal') payrunModal: Modal;
  @ViewChild('form') periodForm: PayrunFormComponent
  @ViewChild('setupcontainer', { read: ViewContainerRef }) setupContainer;

  org: any;
  settings: PayrunSettingsData;
  defer: Subject<boolean> = new Subject();
  processing: boolean = false;
  cancel$: Subject<any> = new Subject();
  setupModalComponentRef: ComponentRef<SetupModalComponent>;

  constructor(
    private router: Router,
    private resolver: ComponentFactoryResolver,
    private orgService: OrgService,
    private session: SessionService,
    private payruns: PayrunService) { }

  private formateDates(model: any) {
    model.start_date = model.start_date.formatted;
    model.end_date = model.end_date.formatted;
    model.payment_date = model.payment_date.formatted;

    return model;
  }

  addSetupModalComponent(settings: PayrunSettingsData) {
    this.setupContainer.clear();
    const factory: ComponentFactory<SetupModalComponent> = this.resolver.resolveComponentFactory(SetupModalComponent);
    this.setupModalComponentRef = this.setupContainer.createComponent(factory);
    this.setupModalComponentRef.instance.org = this.org;
    this.setupModalComponentRef.instance.settings = settings;

    this.setupModalComponentRef.instance.setupComplete.subscribe(complete => {
      if (complete) {
        this.defer.next(false);
      }
    })
  }

  getSettings() {
    this.orgService
      .getPayrunSettings(this.org.id)
      .subscribe(response => {
        this.settings = response.data;
        let settings = response.data.values;
        if (!settings.wages_account || !settings.employee_tax_account || !settings.basic_wage_item) {
          this.defer.next(true);
          this.addSetupModalComponent(this.settings);
          this.setupModalComponentRef.instance.modal.open();
        } else {
          this.defer.next(false);
        }
      })
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
    this.getSettings();

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
    if (this.setupModalComponentRef) this.setupModalComponentRef.destroy();
  }
}
