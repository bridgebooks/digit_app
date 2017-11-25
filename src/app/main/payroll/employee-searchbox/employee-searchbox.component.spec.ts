import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSearchboxComponent } from './employee-searchbox.component';

describe('EmployeeSearchboxComponent', () => {
  let component: EmployeeSearchboxComponent;
  let fixture: ComponentFixture<EmployeeSearchboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSearchboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSearchboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
