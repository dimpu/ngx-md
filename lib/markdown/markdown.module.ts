import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { MarkdownComponent } from "./markdown.component";
import { MarkdownService } from "./markdown.service";
import { MarkdownConfig } from "./markdown.config";

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [MarkdownComponent],
  providers: [MarkdownService],
  exports: [CommonModule, MarkdownComponent, HttpClientModule],
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
