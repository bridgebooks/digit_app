import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesWidgetComponent } from './invoices-widget.component';

describe('InvoicesWidgetComponent', () => {
  let component: InvoicesWidgetComponent;
  let fixture: ComponentFixture<InvoicesWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicesWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
