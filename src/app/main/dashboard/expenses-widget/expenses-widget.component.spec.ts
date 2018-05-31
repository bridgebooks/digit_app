import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesWidgetComponent } from './expenses-widget.component';

describe('ExpensesWidgetComponent', () => {
  let component: ExpensesWidgetComponent;
  let fixture: ComponentFixture<ExpensesWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
