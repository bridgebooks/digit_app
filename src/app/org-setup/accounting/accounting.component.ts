import { Component, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { OrgService } from '../../services';
import { AccountingSettingsData } from '../../models/responses/account-settings';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.scss']
})
export class AccountingComponent implements OnInit {
  saving = false;
  loading = true;
  org$: Subject<any> = new Subject();
  org: any;
  @Output() saved = new EventEmitter();
  @ViewChild('form') form;
  model = {
   values: {
    accounts_receivable: null,
    accounts_payable: null,
    wages: null,
    sales_tax: null,
    financial_year: {
      day: 31,
      month: 12
    }
   }
  }
  model$: Observable<AccountingSettingsData>;
  days: number[];
  months: any[];
  constructor(
    private orgService: OrgService
  ) { }

  private getDays() {
    const count = 31;
    const days = [];

    for (let i = 1; i <= count; i++) {
      days.push(i);
    }

    return days;
  }

  private getMonths() {
    const months = [];
    // tslint:disable-next-line:max-line-length
    const monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
    monthNames.map((name, index) => {
      return {
        label: name,
        value: index + 1
      }
    }).forEach(month => {
      months.push(month);
    });
    return months;
  }

  save() {
    this.saving = true;

    this.orgService
      .updateAccountSettings(this.org.id, { values: this.model.values })
      .subscribe(response => {
        this.saved.emit(true);
      }, err => {
        this.saved.emit(false);
        this.saving = false;
      }, () => {
        this.saving = false;
      })
  }

  ngOnInit() {
    this.days = this.getDays();
    this.months = this.getMonths();
    this.org$.subscribe(org => {
      this.org = org;
      this.model$ = this.orgService.getAccountSettings(org.id)
        .pipe(
          map(response => response.data),
          tap(data => this.model = data)
        );
    })
  }
}
