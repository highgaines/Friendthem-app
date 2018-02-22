describe('Navbar Flow', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('renders the navbar correctly', async () => {
    await element(by.id('login_button')).tap();
    await expect(element(by.text('LOG IN'))).toBeVisible();
    await element(by.id('email_input'));
    await element(by.id('email_input')).typeText('naz@simplefractal.com');
    await element(by.id('password_input')).typeText('snap');
    await element(by.id('start_button')).tap();
    // await element(by.text('WE WOULD LIKE TO ACCESS YOUR LOCATION'));
    // await expect(element(by.id('connect_button_okay').withDescendant(by.id('connect_button')))).toBeVisible();
    // await element(by.id('connect_button_okay').withDescendant(by.id('connect_button'))).atIndex(0).tap();
    // await element(by.text('WE WOULD ALSO LIKE TO SEND YOU NOTIFICATIONS'));
    // await element(by.id('connect_button_okay').withDescendant(by.id('connect_button'))).atIndex(0).tap();
    await expect(element(by.text('Welcome!'))).toBeVisible();
    await element(by.text('FIND PEOPLE NEARBY')).tap();
    await element(by.id('start-button')).tap();
    await expect(element(by.id('navbar'))).toBeVisible();
  });
});
