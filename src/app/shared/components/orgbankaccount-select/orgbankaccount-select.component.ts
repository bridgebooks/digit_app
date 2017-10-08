import { Component, Input, Output, EventEmitter, SimpleChanges, OnInit, OnChanges } from '@angular/core';
import { BankAccount } from '../../../models/data/bank-account';
import { BankAccountService } from '../../../services';

@Component({
  selector: 'app-orgbankaccount-select',
  templateUrl: './orgbankaccount-select.component.html',
  styleUrls: ['./orgbankaccount-select.component.scss'],
  providers: [BankAccountService]
})
export class OrgbankaccountSelectComponent implements OnInit, OnChanges {

  @Input('selected') selected: string;  
  @Input('org') org;
  @Output() accountSelected = new EventEmitter();
  accounts: BankAccount[];

  constructor(private accounts$: BankAccountService) { }

  filterChanged(selected: string) {
    this.accountSelected.emit(selected);
  }

  fetchAccounts() {
    this.accounts$.all(this.org.id)
      .subscribe(response => {
        this.accounts = response.data;
      })
  }

  ngOnInit() {
    this.fetchAccounts();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.org = changes.org ? changes.org.currentValue : this.org;
  }
}
