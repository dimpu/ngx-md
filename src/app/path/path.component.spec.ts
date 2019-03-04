import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathComponent } from './path.component';
import { NgxMdModule } from 'projects/ngx-md/src/public_api';
import { HttpClientModule } from '@angular/common/http';

describe('PathComponent', () => {
  let component: PathComponent;
  let fixture: ComponentFixture<PathComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ PathComponent ],
        imports: [ NgxMdModule.forRoot(), HttpClientModule ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
