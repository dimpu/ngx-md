//our root app component
import {Component, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import ngx-md module
import { NgxMdModule } from 'ngx-md';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'my-app',
  template: `
    <markdown>
    ## HI
    </markdown>
  `,
})
export class AppComponent {
  constructor() {
  }
}

@NgModule({
  imports: [BrowserModule, NgxMdModule],
  providers: [
    provideHttpClient(),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
