import { Angular2MarkdownPage } from './app.po';

describe('ngx-md App', () => {
  let page: Angular2MarkdownPage;

  beforeEach(() => {
    page = new Angular2MarkdownPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
