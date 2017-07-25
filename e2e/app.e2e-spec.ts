import { StartAppPage } from './app.po';

describe('start-app App', () => {
  let page: StartAppPage;

  beforeEach(() => {
    page = new StartAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
