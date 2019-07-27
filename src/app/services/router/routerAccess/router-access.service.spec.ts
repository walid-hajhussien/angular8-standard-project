import { TestBed } from '@angular/core/testing';

import { RouterAccessService } from './router-access.service';

describe('RouterAccessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouterAccessService = TestBed.get(RouterAccessService);
    expect(service).toBeTruthy();
  });
});
