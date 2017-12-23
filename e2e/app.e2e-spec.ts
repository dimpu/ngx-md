import { AppPage } from "./app.po";

describe("ngx-md App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should display title", () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual("Markdown <=> HTML");
  });

  it("should got to tables page", () => {
    page.navigateTo("/tables");
    expect(page.getPanelTitle()).toEqual("Markdown");
  });
});
