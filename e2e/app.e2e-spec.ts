import { OaWebPage } from './app.po';

describe('oa-web App', () => {
  let page: OaWebPage;

  beforeEach(() => {
    page = new OaWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
