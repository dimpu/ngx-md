import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home';
import { TablesComponent } from './tables/tables.component';
import { PathComponent } from './path/path.component';
import { VariableBindComponent } from './variable-bind/variable-bind.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'tables', component: TablesComponent },
  { path: 'path', component: PathComponent },
  { path: 'live', component: VariableBindComponent },
  { path: 'todo', component: TodoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
