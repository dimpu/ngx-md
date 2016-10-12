import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MarkdownDirective } from './markdown.directive';
import { COMPILER_PROVIDERS } from '@angular/compiler';

@NgModule({
  exports: [MarkdownDirective],
  imports: [HttpModule],
  declarations: [MarkdownDirective],
   providers: [
    COMPILER_PROVIDERS // this is an app singleton declaration
  ],
})
export class MarkdownModule { }
