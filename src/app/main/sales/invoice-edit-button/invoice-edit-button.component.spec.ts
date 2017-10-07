import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceEditButtonComponent } from './invoice-edit-button.component';

describe('InvoiceEditButtonComponent', () => {
  let component: InvoiceEditButtonComponent;
  let fixture: ComponentFixture<InvoiceEditButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceEditButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceEditButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
