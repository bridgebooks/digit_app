import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { BankAccountService } from '../../services';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.scss']
})
export class BankingComponent implements OnInit {
  saving = false;
  org: any;
  org$: Subject<any> = new Subject();
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
    private accountService: BankAccountService
  ) { }

  ngOnInit() {
    this.org$.subscribe(org => {
      this.model.org_id = org.id;
      this.org = org;
    });
  }

  save() {
    this.saving = true;
    this.accountService.create(this.org.id, this.model)
      .subscribe(response => {
        this.saved.emit(true);
        this.saving = false;
      }, error => {
        this.saving = false;
      });
  }
}
