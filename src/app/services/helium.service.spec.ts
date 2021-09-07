import { TestBed } from '@angular/core/testing';

import { HeliumService } from './helium.service';

describe('HeliumService', () => {
  let service: HeliumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeliumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
