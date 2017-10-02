import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceEmailButtonComponent } from './invoice-email-button.component';

describe('InvoiceEmailButtonComponent', () => {
  let component: InvoiceEmailButtonComponent;
  let fixture: ComponentFixture<InvoiceEmailButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceEmailButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceEmailButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
