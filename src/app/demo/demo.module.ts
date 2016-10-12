import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DemoComponent } from './demo.component';
import { MarkdownModule } from '../markdown/markdown.module';
import { TestComponent } from './test.component';

@NgModule({
  exports: [
    DemoComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    MarkdownModule
  ],
  declarations: [
    TestComponent,
    DemoComponent
  ],
  bootstrap: [DemoComponent]

})
export class DemoModule { }
