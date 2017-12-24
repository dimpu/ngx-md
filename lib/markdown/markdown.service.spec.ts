import { TestBed, async, inject, getTestBed } from "@angular/core/testing";
import {
  HttpClientModule,
  HttpClient,
  HttpParams,
  HttpResponse
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { MarkdownService } from "./markdown.service";

describe("Markdown Service", () => {
  let response: HttpResponse<Object>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [MarkdownService]
    });
  });

  it(
    `should issue a request`,
    // 1. declare as async test since the HttpClient works with Observables
    async(
      // 2. inject HttpClient and HttpTestingController into the test
      inject(
        [HttpClient, HttpTestingController],
        (http: HttpClient, backend: HttpTestingController) => {
          // 3. send a simple request
          http.get("/foo/bar").subscribe();

          // 4. HttpTestingController supersedes `MockBackend` from the "old" Http package
          // here two, it's significantly less boilerplate code needed to verify an expected request
          backend.expectOne({
            url: "/foo/bar",
            method: "GET"
          });
        }
      )
    )
  );
  it(
    "should call http service to get [path] content",
    async(
      inject(
        [HttpClient, HttpTestingController, MarkdownService],
        (
          http: HttpClient,
          backend: HttpTestingController,
          mdService: MarkdownService
        ) => {
          spyOn(http, "get").and.returnValue(Observable.of());
          const mockSrc = "src-x";
          mdService.getContent(mockSrc);
          expect(http.get).toHaveBeenCalledWith(mockSrc, {
            responseType: "text"
          });
        }
      )
    )
  );

  it(
    "should return data",
    async(
      inject(
        [HttpClient, HttpTestingController, MarkdownService],
        (
          http: HttpClient,
          backend: HttpTestingController,
          mdService: MarkdownService
        ) => {
          spyOn(mdService, "extractData");
          const observable = mdService.getContent("src-x");
          observable.subscribe(responseData => {
            expect(mdService.extractData).toHaveBeenCalledWith(
              response,
              jasmine.any(Number)
            );
          });
        }
      )
    )
  );
});
