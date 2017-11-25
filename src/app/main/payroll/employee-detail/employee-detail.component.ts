import { ViewChild, Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService, AlertService } from '../../../services';
import { Employee } from '../../../models/data/employee';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Modal } from 'clarity-angular';
import { Observable } from 'rxjs/Observable';
import { IMyDate, IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})

export class EmployeeDetailComponent implements OnInit, AfterContentInit, OnDestroy {

  @ViewChild('deleteModal') deleteModal: Modal;
  @ViewChild('terminationModal') terminationModal: Modal;
  @ViewChild('reinstateModal') reinstateModal: Modal;
  
  route$: Subscription;
  cancel$: Subject<any> = new Subject();
  modalState$: Subscription;
  loading: boolean;
  processing: boolean;
  deleting: boolean;
  employee: Employee;
  model: any = {
    termination_date: null,
    start_date: null,
  }

  datePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    inline: true
  }
  termination_date: IMyDate;
  start_date: IMyDate;  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alerts: AlertService,
    private service: EmployeeService
  ) { }

  terminate() {
    this.processing = true;
    let status = 'terminated';
    let termination_date = this.model.termination_date;

    this.service
      .update(this.employee.id, { status, termination_date })
      .takeUntil(this.cancel$)
      .subscribe(response => {
        this.processing = false;
        this.employee.status = 'terminated';
        this.terminationModal.close();
        this.alerts.success('Update Employee', 'Employee sucessfully terminated', { timeOut: 3000 });
      }, err => {
        this.processing = false;
      })
  }

  reinstate() {
    this.processing = true;
    let status = 'active';
    let start_date = this.model.start_date;

    this.service
      .update(this.employee.id, { status, start_date })
      .takeUntil(this.cancel$)
      .subscribe(response => {
        this.processing = false;
        
        this.employee.status = 'active';
        this.employee.start_date = start_date;
        this.employee.termination_date = null;

        this.reinstateModal.close();
        this.alerts.success('Reinstate Employee', 'Employee sucessfully reinstated', { timeOut: 3000 });
      }, err => {
        this.processing = false;
      })
  }

  delete() {
    this.deleting = true;

    this.service
      .delete(this.employee.id)
      .takeUntil(this.cancel$)
      .subscribe(response => {
        this.deleting = false;
        this.deleteModal.close()
        this.router.navigate(['/payroll/employees'], { queryParams: { status: 'all' } });
        this.alerts.success('Delete Employee', 'Employee sucessfully deleted', { timeOut: 3000 });
      }, err => {
        this.deleting = false
      })
  }

  fetchEmployee(id: string) {
    this.loading = true;

    this.service
      .get(id)
      .takeUntil(this.cancel$)
      .subscribe(response => {
        this.loading = false;
        this.employee = response.data;
      }, err => {
        this.loading = false;
      })
  }

  onTerminationDateChange($event) {
    this.model.termination_date = $event.formatted;
    this.termination_date = $event.date;
  }

  onStartDateChange($event) {
    this.model.start_date = $event.formatted;
    this.start_date = $event.date;
  }

  ngOnInit() {
    this.route$ = this.route.params
      .filter(params => params.id)
      .takeUntil(this.cancel$)
      .subscribe(params => {
        this.fetchEmployee(params.id);
      });
  }

  ngAfterContentInit() {
    const modalState$ = Observable.merge(this.deleteModal._openChanged, this.terminationModal._openChanged);
    this.modalState$ = modalState$.subscribe(open => {
      this.cancel$.next();
    })
  }

  ngOnDestroy() {
    this.route$.unsubscribe();
    this.modalState$.unsubscribe();
    this.cancel$.complete();
  }
}
