//our root app component
import { Component, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

// import ngx-md module
import { MarkdownModule } from "ngx-md";

@Component({
  selector: "my-app",
  template: `
    <markdown>
    ## HI
    </markdown>
  `
})
export class AppComponent {
  constructor() {}
}

@NgModule({
  imports: [BrowserModule, MarkdownModule.forRoot()],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
