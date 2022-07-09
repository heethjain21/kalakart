import { KalaKartPage } from './app.po';

describe('kalakart App', () => {
  let page: KalaKartPage;

  beforeEach(() => {
    page = new KalaKartPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
