import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayitemAmountInputComponent } from './payitem-amount-input.component';

describe('PayitemAmountInputComponent', () => {
  let component: PayitemAmountInputComponent;
  let fixture: ComponentFixture<PayitemAmountInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayitemAmountInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayitemAmountInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
