import { ViewChild, Input, Output, EventEmitter, Component, OnInit, OnDestroy } from '@angular/core';
import { Payitem } from 'app/models/data/payitem';
import { Modal } from 'clarity-angular';
import { ControlContainer, FormControl } from '@angular/forms';
import { ObjectUtils } from 'app/shared';
import { AlertService, PayitemService } from 'app/services';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-payitem-form-modal',
  templateUrl: './payitem-form-modal.component.html',
  styleUrls: ['./payitem-form-modal.component.scss']
})
export class PayitemFormModalComponent implements OnInit, OnDestroy {

  @ViewChild('modal') modal: Modal
  @ViewChild('form') form;
  @Input('org') org: any;
  @Output() itemUpdated: EventEmitter<Payitem> = new EventEmitter();
  @Output() itemCreated: EventEmitter<Payitem> = new EventEmitter();

  editing: boolean = false;
  saving: boolean = false;
  loading: boolean = false;
  cancel$: Subject<any> = new Subject();
  model: Payitem = {
    name: null,
    pay_item_type: 'wages',
    mark_default: true
  }

  payitemTypes: any = [
    { label: 'Wages', value: 'wages' },
    { label: 'Allowances', value: 'allowances' },
    { label: 'Deductions', value: 'deductions' },
    { label: 'Reimbursements', value: 'reimbursements' }
  ]

  constructor(private alerts: AlertService, private payItems: PayitemService) { }

  open(item?: Payitem) {
    this.modal.open();
    this.editing = false;
  }

  edit(id: string) {
    this.editing = true;
    this.loading = true;
    this.modal.open();
    this.payItems.get(id)
      .takeUntil(this.cancel$)
      .subscribe(response => {
        this.model = response.data
        this.loading = false;
      })
  }

  hide() {
    this.modal.close();
  }

  updateItem() {
    let model = ObjectUtils.getDirtyValues(this.form)

    this.payItems.update(this.model.id, model)
      .takeUntil(this.cancel$)
      .subscribe(response => {
        this.saving = false;
        this.modal.close();
        this.alerts.success('Pay item', 'Pay item updated', { timeOut: 3000 });
        this.itemUpdated.emit(response.data);
      },
      err => {
        this.saving = false
      })
  }

  createItem() {
    this.model.mark_default = !!this.model.mark_default ? this.model.mark_default : false;
    this.payItems.create(this.model)
      .takeUntil(this.cancel$)
      .subscribe(response => {
        this.saving = false;
        this.modal.close();
        this.alerts.success('Pay item', 'Pay item successfully created', { timeOut: 3000 });
        this.itemCreated.emit(response.data);
      },
      err => {
        this.saving = false
      })
  }

  save() {
    this.saving = true;

    if (this.editing)
      this.updateItem();
    else
      this.createItem();
  }

  accountChanged($event) {
    this.model.account_id = $event;
    (this.form.controls['account_id'] as FormControl).markAsDirty() 
  }

  ngOnInit() {
    this.model.org_id = this.org.id;
    this.modal._openChanged
      .subscribe(open => {
        if (open)  {
          this.cancel$.next();
          this.saving = false;
          this.form.reset();
        }
      })
  }

  ngOnDestroy() {
    this.modal._openChanged.unsubscribe();
    this.cancel$.complete();
  }
}
