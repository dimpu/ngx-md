import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MarkdownComponent } from './markdown.component';
import { MarkdownService } from './markdown.service';
import * as marked from 'marked';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';

class MockMarkdownService extends MarkdownService {
  getSource(src: string): Observable<string> {
    return Observable.of('');
  }
}

describe('MarkdownComponent', () => {
  let fixture: ComponentFixture<MarkdownComponent>;
  let component: MarkdownComponent;
  let nativeElement: any;
  let mthService: MarkdownService;

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
    mthService = TestBed.get(MarkdownService);
    fixture = TestBed.createComponent(MarkdownComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });
  
});
