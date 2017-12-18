import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceItemTableComponent } from './invoice-item-table.component';

describe('InvoiceItemTableComponent', () => {
  let component: InvoiceItemTableComponent;
  let fixture: ComponentFixture<InvoiceItemTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceItemTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceItemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
