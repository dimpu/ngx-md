import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { MarkdownService } from './markdown.service';
import { Observable } from 'rxjs/Observable';

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [HttpModule],
    providers: [
      MarkdownService,
      MockBackend,
     { provide: XHRBackend, useClass: MockBackend }
    ]
  });
});

describe('Markdown Service', () => {
  let http: Http;
  let markdownService: MarkdownService;
  let mockBackend: MockBackend;
  const response: Response = undefined;



  beforeEach(() => {
    http = TestBed.get(Http);
    markdownService = TestBed.get(MarkdownService);
    mockBackend = TestBed.get(MockBackend);


    const mockResponse = `Data`;

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });
  });


  it('should call http service to get [path] content', async () => {

    spyOn(window, 'fetch').and.callThrough();

    const mockSrc = 'src-x';

    await markdownService.getContent(mockSrc);

    expect(window.fetch).toHaveBeenCalledWith(mockSrc);
  });


  it('should return data', async () => {

    spyOn(markdownService, 'extractData');

    await markdownService.getContent('src-x');

    expect(markdownService.extractData).toHaveBeenCalledTimes(1);

  });

});
