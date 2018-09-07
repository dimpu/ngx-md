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
});
