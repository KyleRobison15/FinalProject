import { TestBed } from '@angular/core/testing';

import { ApiExternalService } from './api-external.service';

describe('ApiExternalService', () => {
  let service: ApiExternalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiExternalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
