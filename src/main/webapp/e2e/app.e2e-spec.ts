import { MoneyManagerPage } from './app.po';

describe('money-manager App', function() {
  let page: MoneyManagerPage;

  beforeEach(() => {
    page = new MoneyManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
