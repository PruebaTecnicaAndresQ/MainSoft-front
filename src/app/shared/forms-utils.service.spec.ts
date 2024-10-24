import { TestBed } from '@angular/core/testing';

import { FormsUtilsService } from './forms-utils.service';

describe('FormsUtilsService', () => {
  let service: FormsUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormsUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
