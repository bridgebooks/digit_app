import { ViewChild, Component, Input, Output, EventEmitter, SimpleChanges, OnInit, OnChanges } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { AlertService, BankAccountService } from '../../../services';
import { BankAccount } from '../../../models/data/bank-account';
import { ObjectUtils } from '../../../shared/utils/object'

@Component({
  selector: 'app-bank-account-edit-modal',
  templateUrl: './bank-account-edit-modal.component.html',
  styleUrls: ['./bank-account-edit-modal.component.scss']
})
export class BankAccountEditModalComponent implements OnInit {

  @ViewChild('accountForm') form: ControlContainer; 
  @Input('account') account: BankAccount;
  @Output() accountUpdated = new EventEmitter();

  processing: boolean = false;
  modalVisible: boolean = false;

  constructor(private alert: AlertService, private accounts: BankAccountService) { }

  bankSelected($event) {
    this.account.bank_id = $event;
  }

  save() {
    this.processing = true;
    
    let model = ObjectUtils.getDirtyValues(this.form);
    this.accounts.update(this.account.org_id, this.account.id, model)
      .subscribe(response => {
        this.processing = false;
        this.modalVisible = false;
        this.accountUpdated.emit(true)
        this.alert.success('Account', 'Bank Account updated successfully', { timeOut: 3000 });
      }, err => {
        this.processing = false;
      })
  }

  ngOnInit() {

  }

}
