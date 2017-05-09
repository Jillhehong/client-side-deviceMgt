import { Angular4TestPage } from './app.po';

describe('angular4-test App', () => {
  let page: Angular4TestPage;

  beforeEach(() => {
    page = new Angular4TestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
