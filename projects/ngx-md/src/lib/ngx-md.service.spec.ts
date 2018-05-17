import { TestBed, inject } from '@angular/core/testing';

import { NgxMdService } from './ngx-md.service';

describe('NgxMdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxMdService]
    });
  });

  it('should be created', inject([NgxMdService], (service: NgxMdService) => {
    expect(service).toBeTruthy();
  }));
});
