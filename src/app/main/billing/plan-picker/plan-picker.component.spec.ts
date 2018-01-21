import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanPickerComponent } from './plan-picker.component';

describe('PlanPickerComponent', () => {
  let component: PlanPickerComponent;
  let fixture: ComponentFixture<PlanPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
