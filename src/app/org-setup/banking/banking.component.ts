import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { BankAccountService, SessionService } from '../../services';

@Component({
  selector: 'app-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.scss']
})
export class BankingComponent implements OnInit {
  saving = false;
  org: any;
  @Output() saved = new EventEmitter();
  @ViewChild('form') form;
  model: any = {
    org_id: null,
    account_name: null,
    account_number: null,
    bank_id: null,
    name: null,
    notes: null,
    is_default: true
  };

  constructor(
    private session: SessionService,
    private accountService: BankAccountService
  ) { }

  ngOnInit() {
    this.org = this.session.getDefaultOrg();
  }

  save() {
    this.saving = true;
    this.accountService.create(this.org.id, this.model)
      .subscribe(response => {
        this.saved.emit(true);
        this.saving = false;
      }, error => {});
  }
}
