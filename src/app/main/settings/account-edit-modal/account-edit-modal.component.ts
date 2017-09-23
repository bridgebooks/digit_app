import { 
  Component, 
  ViewChild,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnInit,
  OnChanges
} from '@angular/core';
import { AlertService, OrgService, AccountsService } from '../../../services';
import { ObjectUtils } from '../../../shared';
import { Account } from '../../../models/data/account';
import { TaxRate } from '../../../models/data/tax-rate';

@Component({
  selector: 'app-account-edit-modal',
  templateUrl: './account-edit-modal.component.html',
  styleUrls: ['./account-edit-modal.component.scss']
})
export class AccountEditModalComponent implements OnInit, OnChanges {

  @ViewChild('accountForm') form;
  @Input('account') account: Account;
  @Input('types') types: any[];
  @Input('rates') rates: TaxRate[];
  @Output() accountUpdated = new EventEmitter();

  modalVisible: boolean = false;
  processing: boolean = false;

  constructor(private alert: AlertService, private orgService: OrgService, private accountService: AccountsService) { }

  save() {
    this.processing = true;
    let model = ObjectUtils.getDirtyValues(this.form)  

    this.accountService
      .update(this.account.id, model)
      .subscribe(response => {
        this.processing = false;
        this.alert.success('Account', 'Account successfully updated', { timeOut: 3000 })
        this.modalVisible = false;
        this.account = response.data;
        this.accountUpdated.emit(true);
      },
      err => {
        this.processing = false;
      })
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.account) this.account = changes.account.currentValue;
    if (changes.rates) this.rates = changes.rates.currentValue;
    if (changes.types) this.types = changes.types.currentValue;
  }
}
