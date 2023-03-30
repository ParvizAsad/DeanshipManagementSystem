import { TestBed } from '@angular/core/testing';

import { MajorServiceService } from './major-service.service';

describe('MajorServiceService', () => {
  let service: MajorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MajorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
