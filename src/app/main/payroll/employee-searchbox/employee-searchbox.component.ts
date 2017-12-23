import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { SessionService, SearchService } from '../../../services';

@Component({
  selector: 'employee-searchbox',
  templateUrl: './employee-searchbox.component.html',
  styleUrls: ['./employee-searchbox.component.scss']
})
export class EmployeeSearchboxComponent implements OnInit {

  searchTerm$ = new Subject<string>();
  cancel$ = new Subject<any>();
  data: any[] | any;
  total: number
  hideResults: boolean = true;

  constructor(private router: Router, private session: SessionService, private searchService: SearchService) { }

  reset() {
    this.data = null;
    this.total = null;
  }

  viewEmployee(id: string) {
    this.reset();
    this.router.navigate(['/payroll/employees/view', id]);
  }

  onMouseleaveResultsBox($event) {
    this.hideResults = true;
    this.cancel$.next();
  }

  ngOnInit() {
    const org: any = this.session.getDefaultOrg();

    this.searchService
      .search(this.searchTerm$, { index: 'employees', org_id: org.id })
      .takeUntil(this.cancel$)
      .subscribe(result => {
        this.reset();
        this.data = result.data;
        this.total = result.data.length;
        this.hideResults = false;
      });
  }

}
