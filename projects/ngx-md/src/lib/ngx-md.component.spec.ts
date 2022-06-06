import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMdComponent } from './ngx-md.component';

describe('NgxMdComponent', () => {
  let component: NgxMdComponent;
  let fixture: ComponentFixture<NgxMdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxMdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxMdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
