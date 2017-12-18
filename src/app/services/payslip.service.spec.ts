import { TestBed, inject } from '@angular/core/testing';

import { PayslipService } from './payslip.service';

describe('PayslipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PayslipService]
    });
  });

  it('should be created', inject([PayslipService], (service: PayslipService) => {
    expect(service).toBeTruthy();
  }));
});
