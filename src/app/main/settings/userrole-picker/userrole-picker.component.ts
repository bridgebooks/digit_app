import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { RoleService } from '../../../services';
import { Role } from '../../../models/data/role';
import { Roles } from '../../../models/responses/roles';
import { Observable } from 'rxjs';

@Component({
  selector: 'userrole-picker',
  templateUrl: './userrole-picker.component.html',
  styleUrls: ['./userrole-picker.component.scss']
})

export class UserrolePickerComponent implements OnInit {

  roles$: Observable<Roles>;

  selected: string;

  @Output() rolePicked = new EventEmitter<string>();

  constructor(private roles: RoleService) { }

  filterChanged(value) {
    this.rolePicked.emit(this.selected);
  }

  ngOnInit() {
    this.roles$ = this.roles.orgRoles();
  }

  ngOnDestroy() {
  }
}
