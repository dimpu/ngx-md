import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NgxMdService } from './ngx-md.service';
import { Type } from '@angular/core';

describe('NgxMdService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let markdownService: NgxMdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NgxMdService],
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController as Type<
      HttpTestingController
    >);
    markdownService = TestBed.get(NgxMdService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', inject([NgxMdService], (service: NgxMdService) => {
    expect(service).toBeTruthy();
  }));

  it('should fail with 404 to get [path] content', () => {
    const emsg = 'deliberate 404 error';
    const testUrl = 'some/path';
    markdownService.getContent('some/path').subscribe(
      data => fail('should have failed with the 404 error'),
      (error: any) => {
        expect(error).toEqual(
          'Http failure response for some/path: 404 Not Found'
        );
      }
    );
    const req = httpTestingController.expectOne(testUrl);
    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });

  it('should call http service to get [path] content', () => {
    const TEST_DATA = 'Foo';
    const TEST_URL = 'src-x';

    markdownService.getContent(TEST_URL).subscribe(received => {
      expect(received).toEqual(TEST_DATA);
    });

    const req = httpTestingController.expectOne(TEST_URL);
    expect(req.request.method).toBe('GET');
    req.flush(TEST_DATA);
  });

  it('should return data', async(() => {
    spyOn(markdownService, 'extractData');

    const TEST_DATA = 'Foo';
    const TEST_URL = 'src-x';

    markdownService.getContent(TEST_URL).subscribe(responseData => {
      expect(markdownService.extractData).toHaveBeenCalledWith(TEST_DATA);
    });

    const req = httpTestingController.expectOne(TEST_URL);
    expect(req.request.method).toBe('GET');
    req.flush(TEST_DATA);
  }));

  describe('XSS protection', () => {
    describe('Sanitize enabled', () => {
      it('should not change safe links', () => {
        expect(markdownService.compile('[test](foo)').trim()).toEqual(
          '<p><a href="foo">test</a></p>'
        );
        expect(
          markdownService.compile('[test](http://example.com)').trim()
        ).toEqual('<p><a href="http://example.com">test</a></p>');
        expect(
          markdownService.compile('[test](mailto:foo@example.com)').trim()
        ).toEqual('<p><a href="mailto:foo@example.com">test</a></p>');
      });
      it('should change unsafe links', () => {
        expect(
          markdownService
            /* tslint:disable */
            .compile("[Click Me](javascript:alert('Injected!'))")
            .trim()
        ).toEqual(
          '<p><a href="unsafe:javascript:alert(\'Injected!\')">Click Me</a></p>'
        );
      });
    });

    describe('Sanitize disabled', () => {
      it('should not change safe links', () => {
        expect(markdownService.compile('[test](foo)', false).trim()).toEqual(
          '<p><a href="foo">test</a></p>'
        );
        expect(
          markdownService.compile('[test](http://example.com)', false).trim()
        ).toEqual('<p><a href="http://example.com">test</a></p>');
        expect(
          markdownService
            .compile('[test](mailto:foo@example.com)', false)
            .trim()
        ).toEqual('<p><a href="mailto:foo@example.com">test</a></p>');
        expect(
          markdownService
            .compile("[Click Me](javascript:alert('Injected!'))", false)
            .trim()
        ).toEqual(
          '<p><a href="javascript:alert(&#39;Injected!&#39;)">Click Me</a></p>'
        );
      });
    });
  });

  describe('Marked Js', () => {
    it('should get render', () => {
      expect(markdownService.renderer).toBeTruthy();
    });

    it('should extendRenderer return checkbox', () => {});
  });
});
