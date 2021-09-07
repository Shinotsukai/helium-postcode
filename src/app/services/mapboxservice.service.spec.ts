import { TestBed } from '@angular/core/testing';

import { MapboxserviceService } from './mapboxservice.service';

describe('MapboxserviceService', () => {
  let service: MapboxserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapboxserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
