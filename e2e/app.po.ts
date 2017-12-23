import { browser, by, element } from "protractor";

export class AppPage {
  navigateTo(page: string = "/") {
    return browser.get(page);
  }

  getParagraphText() {
    return element(by.css("ngx-root h1")).getText();
  }

  getPanelTitle() {
    return element(by.css(".panel-title")).getText();
  }
}
