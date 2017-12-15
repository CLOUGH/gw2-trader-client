import { TestBed, inject } from '@angular/core/testing';

import { ItemFilterServiceService } from './item-filter-service.service';

describe('ItemFilterServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemFilterServiceService]
    });
  });

  it('should be created', inject([ItemFilterServiceService], (service: ItemFilterServiceService) => {
    expect(service).toBeTruthy();
  }));
});
