import { NgModule, ModuleWithProviders } from '@angular/core';
import { MarkdownComponent } from './ngx-md.component';
import { MarkdownService } from './ngx-md.service';
import { MarkdownConfig } from './ngx-md.config';


@NgModule({
  imports: [],
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

