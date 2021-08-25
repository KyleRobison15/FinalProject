import { TestBed } from '@angular/core/testing';

import { UpdateListingService } from './update-listing.service';

describe('UpdateListingService', () => {
  let service: UpdateListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
