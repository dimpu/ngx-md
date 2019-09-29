import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgxMdModule } from 'libs/ngx-md/src/';
import { AppRoutingModule } from './app.router.module';
import { HomeComponent } from './home';
import { TablesComponent } from './tables/tables.component';
import { VariableBindComponent } from './variable-bind/variable-bind.component';
import { PathComponent } from './path/path.component';
import { TodoComponent } from './todo/todo.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeComponent,
        TablesComponent,
        VariableBindComponent,
        PathComponent,
        TodoComponent,
      ],
      imports: [
        AppRoutingModule,
        NgxMdModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
      ],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
