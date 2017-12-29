import { ViewChild, ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService, AlertService, OrgService, EmployeeService } from '../../../services';
import { Employee } from '../../../models/data/employee';
import { Modal } from '@clr/angular';
import { State } from '@clr/angular/data/datagrid';
import { Subject, Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  @ViewChild('deleteModal') deleteModal: Modal;
  @ViewChild('archiveModal') archiveModal: Modal;
  @ViewChild('restoreModal') restoreModal: Modal;

  route$: Subscription;
  modals$: Subscription;
  cancel$: Subject<any> = new Subject();
  
  loading: boolean = true;
  deleting: boolean = false;
  restoring: boolean = false;

  status: string;
  employees: Employee[] = [];
  perPage: number = 30;
  currentPage: number = 1;
  total: number;

  org: any;
  selected: Employee[] = [];
  enableBulkOptions: boolean = false;

  constructor(
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private alerts: AlertService,
    private session: SessionService, 
    private orgService: OrgService,
    private employeeService: EmployeeService) { }
  
  hideArchiveModal() {
    this.archiveModal.close();
  }

  hideRestoreModal() {
    this.restoreModal.close();
  }

  hideDeleteModal() {
    this.deleteModal.close();
  }

  onSelectedChange(selected: Employee[]) {
    setTimeout(() => {
      this.enableBulkOptions = selected.length > 0 ? true : false;
    }, 0);
  }

  archiveSelected() {
    this.archiveModal.open();
  }

  deleteSelected() {
    this.deleteModal.open();
  }

  terminateSelected() {
    //this.terminate(this.selected)
  }

  restoreSelected() {
    this.restoreModal.open();
  }

  archive() {
    this.deleting = true
    
    const ids = []
    this.selected.forEach(employee => ids.push(employee.id)) 

    this.employeeService
      .archiveMany(ids)
      .subscribe(response => {
        this.alerts.success('Archive', 'Employee(s) successfully archived', { timeOut: 3000 })
        this.deleting = false;
        this.hideArchiveModal();

        this.refresh({})
        this.cdRef.detectChanges();
      }, err => {
        this.deleting = false;
        this.cdRef.detectChanges();
      })
  }

  delete() {
    this.deleting = true
    
    const ids = []
    this.selected.forEach(employee => ids.push(employee.id)) 

    this.employeeService
      .deleteMany(ids)
      .subscribe(response => {
        this.alerts.success('Delete', 'Employee(s) successfully deleted', { timeOut: 3000 })
        this.deleting = false;
        this.hideDeleteModal();

        this.refresh({})
        this.cdRef.detectChanges();
      }, err => {
        this.deleting = false;
        this.cdRef.detectChanges();
      })
  }

  restore() {
    this.restoring = true;

    const ids = []
    this.selected.forEach(employee => ids.push(employee.id)) 

    this.employeeService
      .restoreMany(ids)
      .subscribe(response => {
        this.alerts.success('Delete', 'Employee(s) successfully restored', { timeOut: 3000 })
        this.restoring = false;
        this.restoreModal.close()

        this.refresh({})
        this.cdRef.detectChanges();
      }, err => {
        this.restoring = false;
        this.cdRef.detectChanges();
      })
  }

  terminate(selection: Employee[]) {

  }

  refresh(state: State) {
    state.sort = state.sort || {
      by: 'created_at',
      reverse: true
    }

    const options = {
      page: this.currentPage,
      perPage: this.perPage
    }

    if (this.status) options['status'] = this.status;

    options['orderBy'] = state.sort.by;
    options['sortedBy'] = state.sort.reverse ? 'desc' : 'asc';

    this.selected = [];

    this.orgService
      .getEmployees(this.org.id, options)
      .takeUntil(this.cancel$)
      .subscribe(response => {
        setTimeout(() => { this.loading = false }, 0);
        this.total = response.total;
        this.employees = response.data;
        this.currentPage = response.current_page;
        
        this.cdRef.detectChanges()
      },
      err => {
        setTimeout(() => { this.loading = false }, 0);
      })
  }

  ngOnInit() {
    this.org = this.session.getDefaultOrg();

    this.modals$ = Observable
      .concat(this.archiveModal._openChanged, this.restoreModal._openChanged)
      .subscribe(open => {
        if (!open) this.selected = []
      });

    this.route$ = this.route.queryParams
    .filter(params => params.status)
    .subscribe(params => {
      this.status = params.status || 'all';
      
      if (this.status) {
        this.loading = true;
        this.cancel$.next();
        this.refresh({})
      }
    })
  }

  ngOnDestroy() {
    this.cdRef.detach();
    this.route$.unsubscribe();
    this.modals$.unsubscribe();    
    this.cancel$.complete();
  }
}
