import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpClientModule,
  HttpClient,
  HttpResponse,
  HttpXhrBackend,
  HttpBackend
} from '@angular/common/http';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { NgxMdService } from './ngx-md.service';
import { Observable, of } from 'rxjs';

describe('NgxMdService', () => {
  let httpMock: HttpTestingController;
  let markdownService: NgxMdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NgxMdService]
    });

    // Inject the http service and test controller for each test
    httpMock = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it(
    'should be created',
    inject([NgxMdService], (service: NgxMdService) => {
      expect(service).toBeTruthy();
    })
  );

  beforeEach(() => {
    markdownService = TestBed.get(NgxMdService);
    const mockResponse = `Data`;
  });

  it('should call http service to get [path] content', () => {
    const TEST_DATA = 'Foo';
    const TEST_URL = 'src-x';

    markdownService.getContent(TEST_URL).subscribe(received => {
      expect(received).toEqual(TEST_DATA);
    });

    const req = httpMock.expectOne(TEST_URL);
    expect(req.request.method).toBe('GET');
    req.flush(TEST_DATA);
  });

  it(
    'should return data',
    async(() => {
      spyOn(markdownService, 'extractData');

      const TEST_DATA = 'Foo';
      const TEST_URL = 'src-x';

      markdownService.getContent(TEST_URL).subscribe(responseData => {
        expect(markdownService.extractData).toHaveBeenCalledWith(TEST_DATA);
      });

      const req = httpMock.expectOne(TEST_URL);
      expect(req.request.method).toBe('GET');
      req.flush(TEST_DATA);
    })
  );

  xdescribe('XSS protection', () => {
    describe('Sanitize enabled', () => {
      it('should not change safe links', () => {
        expect(markdownService.compile('[test](foo)').trim())
          .toEqual('<p><a href="foo">test</a></p>');
        expect(markdownService.compile('[test](http://example.com)').trim())
          .toEqual('<p><a href="http://example.com">test</a></p>');
        expect(markdownService.compile('[test](mailto:foo@example.com)').trim())
          .toEqual('<p><a href="mailto:foo@example.com">test</a></p>');
      });
      it('should change unsafe links', () => {
        expect(markdownService.compile('[Click Me](javascript:alert(&#39;Injected!&#39;%29)').trim())
          .toEqual('<p><a href="unsafe:javascript:alert(\'Injected!\'%29">Click Me</a></p>');
      });
    });
    describe('Sanitize disabled', () => {
      it('should not change safe links', () => {
        expect(markdownService.compile('[test](foo)', false).trim())
          .toEqual('<p><a href="foo">test</a></p>');
        expect(markdownService.compile('[test](http://example.com)', false).trim())
          .toEqual('<p><a href="http://example.com">test</a></p>');
        expect(markdownService.compile('[test](mailto:foo@example.com)', false).trim())
          .toEqual('<p><a href="mailto:foo@example.com">test</a></p>');
        expect(markdownService.compile('[Click Me](javascript:alert(&#39;Injected!&#39;%29)', false).trim())
          .toEqual('<p><a href="javascript:alert(&#39;Injected!&#39;%29">Click Me</a></p>');
      });
    });
  });
});
