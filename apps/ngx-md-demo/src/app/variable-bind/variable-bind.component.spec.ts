import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableBindComponent } from './variable-bind.component';
import { NgxMdModule } from 'libs/ngx-md/src';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('VariableBindComponent', () => {
  let component: VariableBindComponent;
  let fixture: ComponentFixture<VariableBindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [VariableBindComponent],
    imports: [NgxMdModule.forRoot(),
        FormsModule,
        ReactiveFormsModule],
    providers: [provideHttpClient(withInterceptorsFromDi())]
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableBindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
