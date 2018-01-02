import { ViewChild, Output, Input, Component, EventEmitter, SimpleChanges, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Modal } from '@clr/angular';
import { PayrunSettingsData } from '../../../models/responses/payrun-settings';
import { OrgService } from '../../../services/index';

@Component({
  selector: 'setup-modal',
  templateUrl: './setup-modal.component.html',
  styleUrls: ['./setup-modal.component.scss']
})
export class SetupModalComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('modal') modal: Modal;
  @Input('settings') settings: PayrunSettingsData;
  @Input('org') org: any;
  @Output() setupComplete: EventEmitter<any> = new EventEmitter();

  saving: boolean = false;

  constructor(private orgService: OrgService) { }

  save() {
    this.saving = true;

    this.orgService
      .updatePayrunSettings(this.org.id, { values: this.settings.values })
      .subscribe(response => {
        this.modal.close();
        this.setupComplete.emit(true);
      }, err => {
        this.saving = false;
      }, () => {
        this.saving = false;
      })
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.settings = changes.settings ? changes.settings.currentValue : this.settings;
  }

  ngOnDestroy() {
  }
}
