import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MarkdownComponent } from './markdown.component';
import { MarkdownService } from './markdown.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import * as marked from 'marked';

import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

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

    it('should call `processRaw` method when [data] is not provided', () => {
      spyOn(component, 'processRaw');
      const mockElement = { nativeElement: { innerHTML: 'html-inner' } };
      component.element = mockElement;
      component.path = undefined;
      component.ngAfterViewInit();

      expect(component.processRaw).toHaveBeenCalled();
    });

    it('should not call `processRaw` method when [data] is provided', () => {
      spyOn(component, 'processRaw');
      component.path = undefined;
      component.data = 'some markdown';
      component.ngAfterViewInit();

      expect(component.processRaw).toHaveBeenCalledTimes(0);
    });
  });

});

@Component({ selector: 'host-for-test', template: '' })
class HostComponent {
}

function createHostComponent(template : string) : ComponentFixture<HostComponent> {
  TestBed.overrideTemplate(HostComponent, template);
  const fixture = TestBed.createComponent(HostComponent);
  fixture.detectChanges();
  return fixture as ComponentFixture<HostComponent>;
}

describe('MarkdownComponent in host', () => {
  let fixture: ComponentFixture<HostComponent>;
  let component: HostComponent;

  const ngContent1 = 'html-inner';
  const ngContent2 = '```html\n<div>Hi</div>\n```';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [MarkdownComponent, HostComponent],
      providers: [
        { provide: MarkdownService, useClass: MockMarkdownService },
      ],
    });
  });

  describe('when using ng-content', () => {
    it('should pass the transcluded content unchanged', () => {
      const template = `<markdown>${ngContent2}</markdown>`;
      fixture = createHostComponent(template);
      const debugElement = fixture.debugElement.query(By.directive(MarkdownComponent)) as DebugElement;
      const component = debugElement.componentInstance;

      expect(component._md).toBe(ngContent2);
    });
  });

});
