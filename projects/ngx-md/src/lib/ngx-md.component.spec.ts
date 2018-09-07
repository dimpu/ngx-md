import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { NgxMdComponent } from './ngx-md.component';
import { NgxMdService } from './ngx-md.service';
import { Observable, of } from 'rxjs';

import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

class MockNgxMdService extends NgxMdService {
  getContent(src: string): Observable<any> {
    return of('');
  }
}

describe('NgxMdComponent', () => {
  let fixture: ComponentFixture<NgxMdComponent>;
  let component: NgxMdComponent;
  let nativeElement: any;
  let markdownService: NgxMdService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [NgxMdComponent],
      providers: [
        { provide: NgxMdService, useClass: MockNgxMdService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    markdownService = TestBed.get(NgxMdService);
    fixture = TestBed.createComponent(NgxMdComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  describe('ngAfterViewInit', () => {
    it('should call `onPathChange` when [path] is provided', () => {
      spyOn(component, 'onPathChange');
      component.path = 'paht/to/file.md';
      component.ngAfterViewInit();
      expect(component.onPathChange).toHaveBeenCalled();
    });

    it('should call `processRaw` method when [data] is not provided', () => {
      spyOn(component, 'processRaw');
      const mockElement = { nativeElement: { innerHTML: 'html-inner' } };
      // component.element = mockElement;
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

  describe('XSS protection', () => {
    it('should call service with sanitize enabled', () => {
      spyOn(markdownService, 'compile');

      component.sanitizeHtml = true;
      component.data = 'Foo';

      expect(markdownService.compile).toHaveBeenCalledWith('Foo', true);
    });
    it('should call service with sanitize disabled', () => {
      spyOn(markdownService, 'compile');

      component.sanitizeHtml = false;
      component.data = 'Bar';

      expect(markdownService.compile).toHaveBeenCalledWith('Bar', false);
    });
  });
});

@Component({ selector: 'ngx-md-host-for-test', template: '' })
class HostComponent {
}

function createHostComponent(template: string): ComponentFixture<HostComponent> {
  TestBed.overrideTemplate(HostComponent, template);
  const fixture = TestBed.createComponent(HostComponent);
  fixture.detectChanges();
  return fixture as ComponentFixture<HostComponent>;
}

describe('NgxMdComponent in host', () => {
  let fixture: ComponentFixture<HostComponent>;

  const ngContent2 = '```html\n<div>Hi</div>\n```';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [NgxMdComponent, HostComponent],
      providers: [
        { provide: NgxMdService, useClass: MockNgxMdService },
      ],
    });
  });

  describe('when using ng-content', () => {
    it('should pass the transcluded content unchanged', () => {
      const template = `<markdown>${ngContent2}</markdown>`;
      fixture = createHostComponent(template);
      const debugElement = fixture.debugElement.query(By.directive(NgxMdComponent)) as DebugElement;
      const component = debugElement.componentInstance;

      expect(component._md).toBe(ngContent2);
    });
  });

});
