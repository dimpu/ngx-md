import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MarkdownModule } from 'angular2-markdown';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    MarkdownModule.forRoot()

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
