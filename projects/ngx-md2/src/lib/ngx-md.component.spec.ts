import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMdComponent } from './ngx-md.component';

describe('NgxMdComponent', () => {
  let component: NgxMdComponent;
  let fixture: ComponentFixture<NgxMdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxMdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
