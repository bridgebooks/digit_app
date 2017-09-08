import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInvoicesComponent } from './contact-invoices.component';

describe('ContactInvoicesComponent', () => {
  let component: ContactInvoicesComponent;
  let fixture: ComponentFixture<ContactInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactInvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
