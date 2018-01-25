import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensechartWidgetComponent } from './expensechart-widget.component';

describe('ExpensechartWidgetComponent', () => {
  let component: ExpensechartWidgetComponent;
  let fixture: ComponentFixture<ExpensechartWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensechartWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensechartWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
