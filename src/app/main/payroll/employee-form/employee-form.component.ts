import { ViewChild, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { AlertService, SessionService, EmployeeService } from '../../../services';
import { Employee } from '../../../models/data/employee';
import { ObjectUtils } from '../../../shared';
import { IMyDpOptions, IMyDate } from 'mydatepicker';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  @ViewChild('form') form;

  genders: any = [
    { label: 'Female', value: 'female' },
    { label: 'Male', value: 'male' }
  ]

  editing: boolean;
  saving: boolean = false;
  loading: boolean;

  org: any;
  model: any = {};
  modelID: string;

  datePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd'
  }

  dob: IMyDate;
  startDate: IMyDate;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private session: SessionService,
    private alerts: AlertService,
    private employeeService: EmployeeService) { }
  
  toDateObject(dateString: string) {
    let d: Date = new Date(dateString);
    return {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate()
    }
  }
  
  getEmployee(id: string) {
    this.loading = true;

    this.employeeService.get(this.modelID)
      .subscribe(response => {
        this.loading = false;
        this.model = response.data || response;
        
        if (this.model.date_of_birth) this.dob = this.toDateObject(this.model.date_of_birth)
        if (this.model.start_date) this.startDate = this.toDateObject(this.model.start_date)
        console.log(this.model)
      }, (err) => {
        this.loading = false
      })
  }

  onBankChange($event) {
    this.model.bank_id = $event;
    (this.form.controls['bank_id'] as FormControl).markAsDirty()    
  }

  onDOBChanged($event) {
    this.model.date_of_birth = $event.formatted;
    this.dob = $event.date;
    (this.form.controls['date_of_birth'] as FormControl).markAsDirty()
  }

  onStartDateChanged($event) {
    this.model.start_date = $event.formatted;
    this.startDate = $event.date;
    (this.form.controls['start_date'] as FormControl).markAsDirty()
  }

  onSubmit() {
    this.saving = true;
    let model = ObjectUtils.getDirtyValues(this.form);
    
    if (this.editing) {
      this.employeeService
        .update(this.modelID, model)
        .subscribe(response => {
          this.model = response.data || response
          this.dob = this.toDateObject(this.model.date_of_birth);
          this.saving = false;
          this.alerts.success('Employee', 'Employee sucessfully updated', { timeOut: 3000 })
        }, err => {
          this.saving = false
        })
    } else {
      this.model.org_id = this.org.id;
      this.employeeService
        .add(this.model)
        .subscribe(response => {
          this.model = response.data;
          this.saving = false;
          this.alerts.success('Employee', 'Employee sucessfully created', { timeOut: 3000 })
          this.form.resetForm();
          this.router.navigate(['/payroll/employees'], { queryParams: {
            status: 'all'
          }})
        }, err => {
          this.saving = false;
        })
    }
  }

  ngOnInit() {
    this.org = this.session.getDefaultOrg();

    this.route.params
      .filter(params => params.id)
      .subscribe(params => {
        this.editing = params.id ? true : false;
        this.modelID = params.id ? params.id : null;

        if (this.editing) this.getEmployee(this.modelID);
      })
  }

}
