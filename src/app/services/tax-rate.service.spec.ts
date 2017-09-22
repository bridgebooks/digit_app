import { TestBed, inject } from '@angular/core/testing';

import { TaxRateService } from './tax-rate.service';

describe('TaxRateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaxRateService]
    });
  });

  it('should be created', inject([TaxRateService], (service: TaxRateService) => {
    expect(service).toBeTruthy();
  }));
});
