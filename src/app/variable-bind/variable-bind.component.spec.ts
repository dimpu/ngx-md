import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableBindComponent } from './variable-bind.component';
import { NgxMdModule } from 'projects/ngx-md/src/public_api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('VariableBindComponent', () => {
  let component: VariableBindComponent;
  let fixture: ComponentFixture<VariableBindComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ VariableBindComponent ],
        imports: [ NgxMdModule.forRoot(), FormsModule, ReactiveFormsModule ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableBindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
