import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionService, OrgService } from '../../../services';
import { State } from '@clr/angular/data/datagrid'
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  loading: boolean = true;
  org: any;
  users: any[];
  users$: Observable<any>;
  cancel$: Subject<any> = new Subject();

  perPage: number = 10;
  currentPage: number;
  total: number;

  constructor(private session: SessionService, private orgService: OrgService) { }
  refresh(state: State) {
    
    this.users$
      .takeUntil(this.cancel$)
      .subscribe(response => {
        this.users = response.data;

        this.total = response.total;
        this.currentPage = response.current_page;
        
        this.loading = false;
      })
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
