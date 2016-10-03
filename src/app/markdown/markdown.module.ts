import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MarkdownDirective } from './markdown.directive';

@NgModule({
  exports: [MarkdownDirective],
  imports: [
    BrowserModule
  ],
  declarations: [MarkdownDirective]
})
export class MarkdownModule { }
