import { TestBed } from '@angular/core/testing';

import { TripsshowService } from './tripsshow.service';

describe('TripsshowService', () => {
  let service: TripsshowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripsshowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
