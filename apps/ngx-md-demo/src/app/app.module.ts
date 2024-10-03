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
import { NgxMdModule } from 'ngx-md';

import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { TablesComponent } from './tables/tables.component';
import { PathComponent } from './path/path.component';
import { VariableBindComponent } from './variable-bind/variable-bind.component';
import { TodoComponent } from './todo/todo.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app.router.module';

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        TablesComponent,
        PathComponent,
        VariableBindComponent,
        TodoComponent,
    ],
    bootstrap: [AppComponent], 
    imports: [
        BrowserModule,
        FormsModule,
        NgxMdModule.forRoot(),
        AppRoutingModule], 
        providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
