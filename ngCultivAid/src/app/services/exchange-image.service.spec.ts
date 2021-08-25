import { TestBed } from '@angular/core/testing';

import { ExchangeImageService } from './exchange-image.service';

describe('ExchangeImageService', () => {
  let service: ExchangeImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExchangeImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
