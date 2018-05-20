import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpClientModule,
  HttpClient,
  HttpResponse,
  HttpXhrBackend,
  HttpBackend
} from '@angular/common/http';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MarkdownService } from './ngx-md.service';
import { Observable, of } from 'rxjs';


let httpClient: HttpClient;
let httpTestingController: HttpTestingController;


beforeEach(() => {
  
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      MarkdownService
    ]
  });

  // Inject the http service and test controller for each test
  httpClient = TestBed.get(HttpClient);
  httpTestingController = TestBed.get(HttpTestingController);

});

describe('Markdown Service',() => {
  let markdownService: MarkdownService;
  let response: HttpResponse<any>;



  beforeEach(() => {
    markdownService = TestBed.get(MarkdownService);
    const mockResponse = `Data`;
  });


  it('should call http service to get [path] content', () => {

    spyOn(httpClient, 'get').and.returnValue(of());

    const mockSrc = 'src-x';

    markdownService.getContent(mockSrc);

    expect(httpClient.get).toHaveBeenCalledWith(mockSrc);
  });


  it('should return data', async(()=>{

    spyOn(markdownService, 'extractData');

    const observable = markdownService.getContent('src-x');

    observable.then(responseData => {
      expect(markdownService.extractData).toHaveBeenCalledWith(response, jasmine.any(Number));
    });

  }));

});
