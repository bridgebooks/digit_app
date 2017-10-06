import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceStatusButtonComponent } from './invoice-status-button.component';

describe('InvoiceStatusButtonComponent', () => {
  let component: InvoiceStatusButtonComponent;
  let fixture: ComponentFixture<InvoiceStatusButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceStatusButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceStatusButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
