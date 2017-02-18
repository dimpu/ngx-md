import { TestBed } from '@angular/core/testing';
import { MarkdownService } from './markdown.service';
import { Http, HttpModule } from '@angular/http';

describe('MarkdownService', () => {
  let http: Http;
  let mdService: MarkdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [MarkdownService],
    });
  });

  beforeEach(() => {
    http = TestBed.get(Http);
    mdService = TestBed.get(MarkdownService);
  });

  describe('getContent', () => {

    it('should call http service to get path content', () => {

      spyOn(http, 'get').and.returnValue({ toPromise: () => null });

      const mockPath = 'path-x';

      mdService.getContent(mockPath);

      expect(http.get).toHaveBeenCalledWith(mockPath);
    });

    it('should return a promise', () => {

      const mockPromise = { promise: true };
      const mockObservable = { toPromise: () => null };

      spyOn(http, 'get').and.returnValue(mockObservable);
      spyOn(mockObservable, 'toPromise').and.returnValue(mockPromise);

      const promise = mdService.getContent('path-x');

      expect(mockObservable.toPromise).toHaveBeenCalled();
      expect(promise).toBe(mockPromise);
    });
  });
});
