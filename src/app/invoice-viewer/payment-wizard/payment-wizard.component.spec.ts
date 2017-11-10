import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentWizardComponent } from './payment-wizard.component';

describe('PaymentWizardComponent', () => {
  let component: PaymentWizardComponent;
  let fixture: ComponentFixture<PaymentWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
