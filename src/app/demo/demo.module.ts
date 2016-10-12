import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DemoComponent } from './demo.component';
import { MarkdownModule } from '../markdown/markdown.module';

@NgModule({
  exports: [
    DemoComponent,
  ],
  imports: [
    BrowserModule,
    MarkdownModule
  ],
  declarations: [
    DemoComponent
  ],
  bootstrap: [DemoComponent]

})
export class DemoModule { }
