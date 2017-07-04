import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MarkdownComponent } from './markdown.component';
import { MarkdownService } from './markdown.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import * as marked from 'marked';

class MockMarkdownService extends MarkdownService {
  getContent(src: string): Observable<any> {
    return Observable.of('');
  }
}

describe('MarkdownComponent', () => {
  let fixture: ComponentFixture<MarkdownComponent>;
  let component: MarkdownComponent;
  let nativeElement: any;
  let markdownService: MarkdownService;

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
    markdownService = TestBed.get(MarkdownService);
    fixture = TestBed.createComponent(MarkdownComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  describe('ngAfterViewInit', () => {
    it('should call `onPathChange` when [path] is provieded', ()=>{
      spyOn(component,'onPathChange');
      component.path = 'paht/to/file.md';
      component.ngAfterViewInit();
      expect(component.onPathChange).toHaveBeenCalled();
    });

    it('should call handleRaw method when src is not provided', () => {
      spyOn(component, 'processRaw');
      const mockElement = { nativeElement: { innerHTML: 'html-inner' } };
      component.element = mockElement;
      component.path = undefined;
      component.ngAfterViewInit();

      expect(component.processRaw).toHaveBeenCalled();
    });

    it('should not call handleRaw method when data is provided', () => {
      spyOn(component, 'processRaw');
      component.path = undefined;
      component.data = 'some markdown';
      component.ngAfterViewInit();

      expect(component.processRaw).toHaveBeenCalledTimes(0);
    });
  });


  

});
