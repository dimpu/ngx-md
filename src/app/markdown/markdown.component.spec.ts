import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import * as marked from 'marked';
import { MarkdownComponent } from './markdown.component';
import { MarkdownService } from './markdown.service';

class MockMarkdownService extends MarkdownService {

  getContent(path: string) {
    return Promise.resolve(<any>{});
  }
}

describe('MarkdownComponent', () => {
  let fixture: ComponentFixture<MarkdownComponent>;
  let component: MarkdownComponent;
  let nativeElement: any;
  let mdService: MarkdownService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [MarkdownComponent],
      providers: [
        { provide: MarkdownService, useClass: MockMarkdownService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    mdService = TestBed.get(MarkdownService);
    fixture = TestBed.createComponent(MarkdownComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  describe('ngAfterViewInit', () => {

    it('should call setRemoteContent method when path is provided', () => {

      spyOn(component, 'setRemoteContent');

      component.path = './path-example/file.md';
      component.ngAfterViewInit();

      expect(component.setRemoteContent).toHaveBeenCalled();
    });

    it('should set innerHTML on element when path is not provided', () => {

      spyOn(component, 'setInnerHTML');

      const mockElement = { nativeElement: { innerHTML: 'inner-html' } };

      component.element = mockElement;
      component.path = undefined;
      component.ngAfterViewInit();

      expect(component.setInnerHTML).toHaveBeenCalledWith(mockElement.nativeElement.innerHTML);
    });
  });

  describe('ngOnChanges', () => {

    it('should call setRemoteContent method when path is changed', () => {

      spyOn(component, 'setRemoteContent');

      const mockSimpleChanges = { path: null };

      component.ngOnChanges(mockSimpleChanges);

      expect(component.setRemoteContent).toHaveBeenCalled();
    });

    it('should not call setRemoteContent method when path is unchanged', () => {

      spyOn(component, 'setRemoteContent');

      const mockSimpleChanges = {};

      component.ngOnChanges(mockSimpleChanges);

      expect(component.setRemoteContent).not.toHaveBeenCalled();
    });
  });

  describe('setRemoteContent', () => {

    it('should get content from MarkdownService', () => {

      const mockThen = { catch: () => null };
      const mockGetContent = { then: () => mockThen };

      spyOn(mdService, 'getContent').and.returnValue(mockGetContent);

      const mockPath = './path-example/file.md';

      component.path = mockPath;
      component.setRemoteContent();

      expect(mdService.getContent).toHaveBeenCalledWith(mockPath);
    });

    it('should call setInnerHTML according to file extension when not .md', async(() => {

      const mockRaw =  'raw-text';

      spyOn(mdService, 'getContent').and.callFake(() => {
        return Promise.resolve({ text: () => mockRaw });
      });

      spyOn(component, 'setInnerHTML');

      component.path = './path-example/file.cpp';
      const promise = component.setRemoteContent();

      promise.then(() => expect(component.setInnerHTML).toHaveBeenCalledWith('```cpp\n' + mockRaw + '\n```'));
    }));

    it('should call setInnerHTML without file extension when .md', async(() => {

      const mockRaw =  'raw-text';

      spyOn(mdService, 'getContent').and.callFake(() => {
        return Promise.resolve({ text: () => mockRaw });
      });

      spyOn(component, 'setInnerHTML');

      component.path = './path-example/file.md';
      const promise = component.setRemoteContent();

      promise.then(() => expect(component.setInnerHTML).toHaveBeenCalledWith(mockRaw));

    }));

    it('should call handleError when an error occurs', async(() => {

      const mockError = { message: 'error-message' };

      spyOn(mdService, 'getContent').and.callFake(() => {
        return Promise.reject(mockError);
      });

      spyOn(component, 'handleError');

      component.path = './path-example/file.md';
      const promise = component.setRemoteContent();

      promise.then(() => expect(component.handleError).toHaveBeenCalledWith(mockError));
    }));
  });

  describe('setInnerHTML', () => {

    it('should set innerHTML with compiled markdown', () => {

      const raw = '### Raw';
      const markdown = '### Markdown';

      spyOn(component, 'prepare').and.returnValue(markdown);

      component.setInnerHTML(raw);

      expect(component.prepare).toHaveBeenCalledWith(raw);
      expect(component.element.nativeElement.innerHTML).toBe(marked(markdown));
    });

    it('should apply Prism highlight', () => {

      spyOn(Prism, 'highlightAll');

      component.setInnerHTML('### Raw');

      expect(Prism.highlightAll).toHaveBeenCalledWith(false);
    });
  });

  describe('handleError', () => {

    it('should log console error', () => {

      spyOn(console, 'error');

      const error = new Error('error-message');

      component.handleError(error);

      expect(console.error).toHaveBeenCalledWith('An error occurred', error);
    });

    it('should return rejected promise', async(() => {

      spyOn(console, 'error');

      const errorMessage = new Error('error-message');

      component.handleError(errorMessage).catch((reason: any) => {
        expect(reason).toBe(errorMessage.message);
      });

      const error = new Error();

      component.handleError(error).catch((reason: any) => {
        expect(reason).toBe(error);
      });
    }));
  });

  describe('prepare', () => {

    it('should return empty string when raw is null/undefined/empty', () => {

      expect(component.prepare(null)).toBe('');
      expect(component.prepare(undefined)).toBe('');
      expect(component.prepare('')).toBe('');
    });

    it('should remove leading whitespaces offset while keeping indent', () => {

      const mockRaw =  [
        '',               // wait for line with non-whitespaces
        '  * list',       // find first line with non-whitespaces to set offset
        '    * sub-list', // keep indent while removing from previous row offset
      ];

      const expected = [
        '',
        '* list',
        '  * sub-list',
      ];

      expect(component.prepare(mockRaw.join('\n'))).toBe(expected.join('\n'));
    });

    it('should return line with indent correctly', () => {

      const mockRaw =  [
        '* list',       // find first line with non-whitespaces to set offset
        '  * sub-list', // keep indent while removing from previous row offset
        '',             // keep blank line
        'Lorem Ipsum',  // keep everthing else
      ];

      const expected = [
        '* list',
        '  * sub-list',
        '',
        'Lorem Ipsum',
      ];

      expect(component.prepare(mockRaw.join('\n'))).toBe(expected.join('\n'));
    });
  });
});

