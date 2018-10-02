import { Component, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { OrgSetupModel } from '../models/forms/org-setup';


import '@clr/icons/shapes/core-shapes';
import { ClrWizard } from '@clr/angular';
import { Observable } from 'rxjs/Observable';
import { OrgBasicComponent } from './org-basic/org-basic.component';

@Component({
  selector: 'app-org-setup',
  templateUrl: './org-setup.component.html',
  styleUrls: ['./org-setup.component.scss']
})
export class OrgSetupComponent implements OnInit, OnChanges {
  openWizard = false;
  wizardCloseable = false;
  @ViewChild('wizard') wizard: ClrWizard
  @ViewChild('orgform') orgform: OrgBasicComponent;
  processing = false;
  orgStepComplete = false;

  constructor(public router: Router) { }

  ngOnInit() {
    // this.orgform.processing.subscribe(processing => {
    //   this.processing = processing;
    // });
    // this.orgform.saved.subscribe(done => {
    //   if (done) {
    //     this.orgStepComplete = true;
    //     this.wizard.next();
    //   }
    // });
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  doCustomClick($event) {
    if ($event === 'create-org') {
      this.orgform.save();
    } else {
    }
  }
}
