import { TestBed, inject } from '@angular/core/testing';

import { ItemFilterService } from './item-filter.service';

describe('ItemFilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemFilterService]
    });
  });

  it('should be created', inject([ItemFilterService], (service: ItemFilterService) => {
    expect(service).toBeTruthy();
  }));
});
