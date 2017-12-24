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
  // let injector: TestBed;
  // let markdownService: MarkdownService;
  // let httpMock: HttpTestingController;
  let response: HttpResponse<Object>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [MarkdownService]
    });
    // injector = getTestBed();
    // markdownService = injector.get(MarkdownService);
    // httpMock = injector.get(HttpTestingController);
  });

  afterEach(
    inject([HttpTestingController], (backend: HttpTestingController) => {
      backend.verify();
    })
  );

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
            expect(mdService.extractData).toHaveBeenCalled();
            //   expect(mdService.extractData).toHaveBeenCalledWith(
            //     response,
            //     jasmine.any(Number)
            //   );
          });
        }
      )
    )
  );

  //   it(
  //     "should return data",
  //     async(() => {
  //       spyOn(markdownService, "extractData");

  //       const observable = markdownService.getContent("src-x");

  //       observable.subscribe(responseData => {
  //         expect(markdownService.extractData).toHaveBeenCalledWith(
  //           response,
  //           jasmine.any(Number)
  //         );
  //       });
  //     })
  //   );
});

// import {
//   HttpModule,
//   Http,
//   Response,
//   ResponseOptions,
//   XHRBackend
// } from "@angular/http";
// import { MockBackend } from "@angular/http/testing";
// import { MarkdownService } from "./markdown.service";
// import { Observable } from "rxjs/Observable";

// beforeEach(() => {
//   TestBed.configureTestingModule({
//     imports: [HttpClientTestingModule],
//     providers: [
//       MarkdownService
// MockBackend,
// { provide: XHRBackend, useClass: MockBackend }
//     ]
//   });
// });

// describe("Markdown Service", () => {
//   let injector: TestBed;
//   let http: HttpClient;
//   let markdownService: MarkdownService;
//   let httpMock: HttpTestingController;

//   let mockBackend: MockBackend;
//   let response: Response;

// beforeEach(() => {
//   injector = getTestBed();

//   http = TestBed.get(HttpClient);
//   markdownService = TestBed.get(MarkdownService);
//   httpMock = injector.get(HttpTestingController);

//   //     mockBackend = TestBed.get(MockBackend);
//   //     const mockResponse = `Data`;
//   //     mockBackend.connections.subscribe(connection => {
//   //       connection.mockRespond(
//   //         new Response(
//   //           new ResponseOptions({
//   //             body: JSON.stringify(mockResponse)
//   //           })
//   //         )
//   //       );
//   //     });
// });

//   it("should call http service to get [path] content", () => {
//     spyOn(http, "get").and.returnValue(Observable.of());

//     const mockSrc = "src-x";

//     markdownService.getContent(mockSrc);

//     expect(http.get).toHaveBeenCalledWith(mockSrc);
//   });

//   it(
//     "should return data",
//     async(() => {
//       spyOn(markdownService, "extractData");

//       const observable = markdownService.getContent("src-x");

//       observable.subscribe(responseData => {
//         expect(markdownService.extractData).toHaveBeenCalledWith(
//           response,
//           jasmine.any(Number)
//         );
//       });
//     })
//   );
// });
