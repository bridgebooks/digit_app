import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { OrgSetupModel } from '../../models/forms/org-setup';
import { SessionService, JwtService, OrgService } from '../../services';

@Component({
  selector: 'app-org-basic',
  templateUrl: './org-basic.component.html',
  styleUrls: ['./org-basic.component.scss']
})
export class OrgBasicComponent implements OnInit {
  @ViewChild('form') form;
  saving = false;
  model: OrgSetupModel = {
    name: null
  }
  @Output() saved: EventEmitter<boolean> = new EventEmitter();
  @Output() orgCreated: EventEmitter<any> = new EventEmitter();
  constructor(
    private orgService: OrgService,
    private session: SessionService,
    private jwtService: JwtService
  ) { }

  onLogoUrlChanged($event) {
    this.model.logo_url = $event;
  }

  save() {
    this.saving = true;
    this.orgService.create(this.model)
      .subscribe(response => {
        // save user
        this.session.addUser(response.data.user);
        // save new token
        this.jwtService.saveToken(response.data.token);
        // read token
        const token = this.jwtService.getToken();
        // add org
        this.session.addDefaultOrg(token.orgs[0]);
        this.orgCreated.emit(token.orgs[0]);

        this.saved.emit(true);
        this.saving = false;
      }, error => {
        this.saving = false;
      });
  }

  ngOnInit() {
  }
}
