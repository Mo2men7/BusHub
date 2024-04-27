import { TestBed } from '@angular/core/testing';

import { PrivateBusService } from './private-bus.service';

describe('PrivateBusService', () => {
  let service: PrivateBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivateBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
