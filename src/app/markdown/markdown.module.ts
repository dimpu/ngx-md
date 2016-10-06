import { NgModule } from '@angular/core';
import { MarkdownDirective } from './markdown.directive';

@NgModule({
  exports: [MarkdownDirective],
  imports: [],
  declarations: [MarkdownDirective]
})
export class MarkdownModule { }
