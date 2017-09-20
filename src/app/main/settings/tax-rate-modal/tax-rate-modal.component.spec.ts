import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxRateModalComponent } from './tax-rate-modal.component';

describe('TaxRateModalComponent', () => {
  let component: TaxRateModalComponent;
  let fixture: ComponentFixture<TaxRateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxRateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxRateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
