import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MarkdownModule } from 'ngx-md';
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
    TodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MarkdownModule.forRoot(),
    RouterModule.forRoot([
           { path: '', component: HomeComponent },
           { path: 'home', component: HomeComponent },
           { path: 'tables', component: TablesComponent },
           { path: 'path', component: PathComponent },
           { path: 'live', component: VariableBindComponent },
           { path: 'todo', component: TodoComponent }


       ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
