import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MarkdownComponent } from './markdown.component';
import { MarkdownService } from './markdown.service';
import { MarkdownConfig } from './markdown.config';

@NgModule({
  imports: [CommonModule,HttpModule],
  declarations: [MarkdownComponent],
  providers: [MarkdownService],
  exports: [MarkdownComponent],
  entryComponents: [MarkdownComponent]
})
export class MarkdownModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MarkdownModule,
      providers: [MarkdownConfig]
    };
  }
}
