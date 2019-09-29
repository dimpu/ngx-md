import { async, TestBed } from '@angular/core/testing';
import { NgxMdModule } from './ngx-md.module';

describe('NgxMdModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxMdModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgxMdModule).toBeDefined();
  });
});
