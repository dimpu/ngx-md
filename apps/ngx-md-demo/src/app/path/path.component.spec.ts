import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathComponent } from './path.component';
import { NgxMdModule } from 'libs/ngx-md/src';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PathComponent', () => {
  let component: PathComponent;
  let fixture: ComponentFixture<PathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [PathComponent],
    imports: [NgxMdModule.forRoot()],
    providers: [provideHttpClient(withInterceptorsFromDi())]
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
