import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactBillsComponent } from './contact-bills.component';

describe('ContactBillsComponent', () => {
  let component: ContactBillsComponent;
  let fixture: ComponentFixture<ContactBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
