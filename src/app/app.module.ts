import 'prismjs/prism';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-perl';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgxMdModule } from 'ngx-md';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { TablesComponent } from './tables/tables.component';
import { PathComponent } from './path/path.component';
import { VariableBindComponent } from './variable-bind/variable-bind.component';
import { TodoComponent } from './todo/todo.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TablesComponent,
    PathComponent,
    VariableBindComponent,
    TodoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxMdModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'tables', component: TablesComponent },
      { path: 'path', component: PathComponent },
      { path: 'live', component: VariableBindComponent },
      { path: 'todo', component: TodoComponent },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
