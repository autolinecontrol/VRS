import { TestBed } from '@angular/core/testing';

import { EnviarcorreosService } from './enviarcorreos.service';

describe('EnviarcorreosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnviarcorreosService = TestBed.get(EnviarcorreosService);
    expect(service).toBeTruthy();
  });
});
