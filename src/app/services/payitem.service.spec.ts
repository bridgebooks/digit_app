import { TestBed, inject } from '@angular/core/testing';

import { PayitemService } from './payitem.service';

describe('PayitemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PayitemService]
    });
  });

  it('should be created', inject([PayitemService], (service: PayitemService) => {
    expect(service).toBeTruthy();
  }));
});
