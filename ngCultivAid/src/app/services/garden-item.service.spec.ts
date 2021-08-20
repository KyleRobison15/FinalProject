import { TestBed } from '@angular/core/testing';

import { GardenItemService } from './garden-item.service';

describe('GardenItemService', () => {
  let service: GardenItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GardenItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
