import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicePrintButtonComponent } from './invoice-print-button.component';

describe('InvoicePrintButtonComponent', () => {
  let component: InvoicePrintButtonComponent;
  let fixture: ComponentFixture<InvoicePrintButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicePrintButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicePrintButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
