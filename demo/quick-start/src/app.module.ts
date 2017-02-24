//our root app component
import {Component, NgModule} from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

// import angular2-markdown module
import { MarkdownModule } from 'angular2-markdown';

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
  imports: [BrowserModule,MarkdownModule.forRoot()],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
