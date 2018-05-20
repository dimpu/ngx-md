import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxMdService } from './ngx-md.service';
import { NgxMdConfig } from './ngx-md.config';
import { NgxMdComponent } from './ngx-md.component';

@NgModule({
  imports: [HttpClientModule],
  declarations: [NgxMdComponent],
  providers: [NgxMdService],
  exports: [NgxMdComponent],
})
export class NgxMdModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxMdModule,
      providers: [NgxMdConfig]
    };
  }
}
