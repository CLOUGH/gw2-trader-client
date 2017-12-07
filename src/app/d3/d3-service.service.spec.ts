import { TestBed, inject } from '@angular/core/testing';

import { D3ServiceService } from './d3-service.service';

describe('D3ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [D3ServiceService]
    });
  });

  it('should be created', inject([D3ServiceService], (service: D3ServiceService) => {
    expect(service).toBeTruthy();
  }));
});
