import { TestBed } from '@angular/core/testing';

import { RoomTypeServiceService } from './room-type-service.service';

describe('RoomTypeServiceService', () => {
  let service: RoomTypeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomTypeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
