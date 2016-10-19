/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MarkdownService } from './markdown.service';
import { HttpModule } from '@angular/http';


describe('Service: Markdown', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [MarkdownService]
    });
  });

  it('should ...', inject([MarkdownService], (service: MarkdownService) => {
    expect(service).toBeTruthy();
  }));
});
