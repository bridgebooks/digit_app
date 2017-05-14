import { AnthenaPage } from './app.po';

describe('anthena App', () => {
  let page: AnthenaPage;

  beforeEach(() => {
    page = new AnthenaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
