import { Component, ViewChild, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { OrgSetupModel } from '../models/forms/org-setup';


import '@clr/icons/shapes/core-shapes';
import { ClrWizard } from '@clr/angular';
import { Observable } from 'rxjs/Observable';
import { OrgBasicComponent } from './org-basic/org-basic.component';
import { BankingComponent } from './banking/banking.component';
import { AccountingComponent } from './accounting/accounting.component';

@Component({
  selector: 'app-org-setup',
  templateUrl: './org-setup.component.html',
  styleUrls: ['./org-setup.component.scss']
})
export class OrgSetupComponent implements OnInit, OnChanges, OnDestroy {
  openWizard = false;
  wizardCloseable = false;
  @ViewChild('wizard') wizard: ClrWizard
  @ViewChild('orgform') orgform: OrgBasicComponent;
  @ViewChild('bankingform') bankingform: BankingComponent;
  @ViewChild('accountingform') accountingform: AccountingComponent;
  processing = false;
  orgStepComplete = false;
  bankingStepComplete = false;
  accountingStepComplete = false;

  constructor(public router: Router) { }

  ngOnInit() {
    this.orgform.saved.subscribe(done => {
      if (done) {
        this.orgStepComplete = true;
        this.wizard.next();
      }
    });

    this.orgform.orgCreated.subscribe(org => {
      this.accountingform.org$.next(org);
      this.bankingform.org$.next(org);
    });

    this.bankingform.saved.subscribe(done => {
      if (done) {
        this.bankingStepComplete = true;
        this.wizard.next();
      }
    });

    this.accountingform.saved.subscribe(done => {
      if (done) {
        this.accountingStepComplete = true;
        this.wizard.forceFinish();
        this.router.navigate(['/dashboard']);
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  ngOnDestroy() {
    this.bankingform.saved.unsubscribe();
    this.orgform.saved.unsubscribe();
  }

  doCustomClick($event) {
    if ($event === 'create-org') {
      this.orgform.save();
    } else if ($event === 'create-bank-account') {
      this.bankingform.save();
    } else if ($event === 'save-settings') {
      this.accountingform.save();
    }
  }
}
