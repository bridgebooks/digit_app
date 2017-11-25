import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBulkactionDropdownComponent } from './employee-bulkaction-dropdown.component';

describe('EmployeeBulkactionDropdownComponent', () => {
  let component: EmployeeBulkactionDropdownComponent;
  let fixture: ComponentFixture<EmployeeBulkactionDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeBulkactionDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBulkactionDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
