import { ViewChild, Component, Input, Output, EventEmitter, SimpleChanges, OnInit, OnChanges } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { AlertService, BankAccountService } from '../../../services';

@Component({
  selector: 'app-bank-account-modal',
  templateUrl: './bank-account-modal.component.html',
  styleUrls: ['./bank-account-modal.component.scss']
})
export class BankAccountModalComponent implements OnInit {

  @ViewChild('accountForm') form: ControlContainer;
  @Input('org') org;
  @Output() onAccountAdded = new EventEmitter<any>();

  modalVisible: boolean = false;
  processing: boolean = false;

  model: any = {
    org_id: null,
    account_name: null,
    account_number: null,
    bank_id: null,
    name: null,
    notes: null,
    is_default: 0
  };

  constructor(private alert: AlertService, private accounts: BankAccountService) { }

  bankSelected($event) {
    this.model.bank_id = $event;
  }

  save() {
    this.processing = true;

    this.accounts.create(this.org.id, this.model)
      .subscribe(response => {
        this.processing = false;
        this.modalVisible = false;
        this.onAccountAdded.emit(true);
        this.alert.success('Account', 'Bank Account added successfully', { timeOut: 3000 });
      }, err => {
        this.processing = false;
      })
  }

  ngOnInit() {
    this.model.org_id = this.org.id;
  }
}
