import { TestBed } from '@angular/core/testing';

import { ViewStatusService } from './view-status.service';

describe('ViewStatusService', () => {
  let service: ViewStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
