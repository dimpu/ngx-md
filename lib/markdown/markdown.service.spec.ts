import { TestBed, async, inject, getTestBed } from "@angular/core/testing";
import { HttpClient, HttpParams } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { MarkdownService } from "./markdown.service";

describe("Markdown Service", () => {
  let injector: TestBed;
  let markdownService: MarkdownService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MarkdownService]
    });
    injector = getTestBed();
    markdownService = injector.get(MarkdownService);
    httpMock = injector.get(HttpTestingController);
  });
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
