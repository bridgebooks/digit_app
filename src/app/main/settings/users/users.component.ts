import { ViewChild, Component, OnInit, OnDestroy } from '@angular/core';
import { SessionService, OrgService } from '../../../services';
import { ClrDatagridStateInterface } from '@clr/angular/data/datagrid'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Modal } from '@clr/angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  @ViewChild('deleteModal') deleteModal: Modal;
  loading: boolean = true;
  deleting: boolean = false;
  org: any;
  users: any[];
  users$: Observable<any>;
  cancel$: Subject<any> = new Subject();
  toDelete: string;

  perPage: number = 10;
  currentPage: number;
  total: number;

  constructor(private session: SessionService, private orgService: OrgService) { }

  refresh(state: ClrDatagridStateInterface) {
    
    this.users$
      .takeUntil(this.cancel$)
      .subscribe(response => {
        this.users = response.data;

        this.total = response.total;
        this.currentPage = response.current_page;
        
        this.loading = false;
      })
  }

  delete() {
    this.deleting = true;

    this.orgService
      .deleteUser(this.org.id, this.toDelete)
      .subscribe(response => {
        if (response.status === 'success') {
          this.toDelete = null;
          this.deleting = false;
          this.deleteModal.close();

          this.refresh({})
        }
      }, err => {
        this.deleting = false;
        this.deleteModal.close();
      })
  }

  showDeleteModal(id: string) {
    this.deleteModal.open();
    this.toDelete = id;
  }

  isAdmin(user) {
    const admin = user.roles.filter(role => {
      return role.name === 'org_admin'
    })[0]

    return admin ? true : false;
  }

  ngOnInit() {
    this.org = this.session.getDefaultOrg();
    this.users$ = this.orgService.getUsers(this.org.id)
  }

  ngOnDestroy() {
    this.cancel$.next();
    this.cancel$.complete();
  }
}
