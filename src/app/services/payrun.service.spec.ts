import { TestBed, inject } from '@angular/core/testing';

import { PayrunService } from './payrun.service';

describe('PayrunService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PayrunService]
    });
  });

  it('should be created', inject([PayrunService], (service: PayrunService) => {
    expect(service).toBeTruthy();
  }));
});
