import { ViewChild, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Role } from '../../../models/data/role';

@Component({
  selector: 'app-userinvite-form',
  templateUrl: './userinvite-form.component.html',
  styleUrls: ['./userinvite-form.component.scss']
})
export class UserinviteFormComponent implements OnInit {

  @ViewChild('inviteForm') form;

  model: any = {
    first_name: null,
    last_name: null,
    email: null,
    message: null,
    org_role_id: null
  }

  constructor() { }

  onRoleSelected($event: string) {
    this.model.org_role_id = $event;
    // (this.form.controls['org_role_id'] as FormControl).setValue($event);
  }

  ngOnInit() {
  }

}
