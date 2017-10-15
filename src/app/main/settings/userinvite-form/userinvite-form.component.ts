import { ViewChild, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../../../models/data/role';
import { AlertService, SessionService, OrgService } from '../../../services';

@Component({
  selector: 'app-userinvite-form',
  templateUrl: './userinvite-form.component.html',
  styleUrls: ['./userinvite-form.component.scss']
})
export class UserinviteFormComponent implements OnInit {

  @ViewChild('inviteForm') form;

  org: any;

  model: any = {
    first_name: null,
    last_name: null,
    email: null,
    message: null,
    org_role_id: null
  }

  messageModalVisible: boolean = false;
  sending: boolean = false;

  constructor(private router: Router, private alert: AlertService, private session: SessionService, private orgService: OrgService) { }

  sendInvitation() {
    this.sending = true;
    this.orgService.inviteUser(this.org.id, this.model)
      .subscribe(response => {
        this.messageModalVisible = false;
        this.sending = false;        
        this.router.navigate(['/settings/users']);
        this.alert.success('User invitation', `Your invitation to ${this.model.first_name} will be sent shortly`, { timeOut: 4000 });
      }, err => {
        this.messageModalVisible = false;
        this.sending = false;
      })
  }

  showMessageModal() {
    this.messageModalVisible = true;
    this.model.message = `Hello ${this.model.first_name},\n${this.org.name} would like you to access their account at Bridge Books. ${this.org.name} uses Bridge Books to manage their business`;
  }

  onRoleSelected($event: string) {
    console.log($event);
    this.model.org_role_id = $event;
  }

  ngOnInit() {
    this.org = this.session.getDefaultOrg();
  }

}
