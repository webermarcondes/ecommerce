import { TestBed } from '@angular/core/testing';

import { FormapagtService } from './formapagt.service';

describe('FormapagtService', () => {
  let service: FormapagtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormapagtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
