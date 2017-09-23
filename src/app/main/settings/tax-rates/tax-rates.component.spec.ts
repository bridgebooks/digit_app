import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxRatesComponent } from './tax-rates.component';

describe('TaxRatesComponent', () => {
  let component: TaxRatesComponent;
  let fixture: ComponentFixture<TaxRatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxRatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
