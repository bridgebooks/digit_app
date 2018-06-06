import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitLossWidgetComponent } from './profit-loss-widget.component';

describe('ProfitLossWidgetComponent', () => {
  let component: ProfitLossWidgetComponent;
  let fixture: ComponentFixture<ProfitLossWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfitLossWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitLossWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
