import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingNavComponent } from './billing-nav.component';

describe('BillingNavComponent', () => {
  let component: BillingNavComponent;
  let fixture: ComponentFixture<BillingNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
