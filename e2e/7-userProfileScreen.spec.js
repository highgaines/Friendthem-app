describe('User Profile Screen Flow', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('renders the user profile screen correctly', async () => {
    await element(by.id('login_button')).tap();
    await expect(element(by.text('LOG IN'))).toBeVisible();
    await element(by.id('email_input'));
    await element(by.id('email_input')).typeText('naz@simplefractal.com');
    await element(by.id('password_input')).typeText('snap');
    await element(by.id('start_button')).tap();
    await element(by.text('WE WOULD LIKE TO ACCESS YOUR LOCATION'));
    await expect(element(by.id('connect_button_okay').withDescendant(by.id('connect_button')))).toBeVisible();
    await element(by.id('connect_button_okay').withDescendant(by.id('connect_button'))).atIndex(0).tap();
    await element(by.text('WE WOULD ALSO LIKE TO SEND YOU NOTIFICATIONS'));
    await element(by.id('connect_button_okay').withDescendant(by.id('connect_button'))).atIndex(0).tap();
    await expect(element(by.text('Welcome!'))).toBeVisible();
    await element(by.text('FIND PEOPLE NEARBY')).tap();
    await element(by.id('start-button')).tap();
    await element(by.id('profile-navbar-button')).tap();
    await element(by.text('CLOSE')).tap();
    await expect(element(by.id('tab-selection-container'))).toBeVisible();
  });

  it('edits the user info', async () => {
    await element(by.id('login_button')).tap();
    await expect(element(by.text('LOG IN'))).toBeVisible();
    await element(by.id('email_input'));
    await element(by.id('email_input')).typeText('naz@simplefractal.com');
    await element(by.id('password_input')).typeText('snap');
    await element(by.id('start_button')).tap();
    await element(by.text('WE WOULD LIKE TO ACCESS YOUR LOCATION'));
    await expect(element(by.id('connect_button_okay').withDescendant(by.id('connect_button')))).toBeVisible();
    await element(by.id('connect_button_okay').withDescendant(by.id('connect_button'))).atIndex(0).tap();
    await element(by.text('WE WOULD ALSO LIKE TO SEND YOU NOTIFICATIONS'));
    await element(by.id('connect_button_okay').withDescendant(by.id('connect_button'))).atIndex(0).tap();
    await expect(element(by.text('Welcome!'))).toBeVisible();
    await element(by.text('FIND PEOPLE NEARBY')).tap();
    await element(by.id('start-button')).tap();
    await element(by.id('profile-navbar-button')).tap();
    await element(by.text('CLOSE')).tap();
    await element(by.id('personal-info-tab')).tap();

    await element(by.id('edit-pencil-age')).tap();
    await element(by.id('input-age')).tap();
    await element(by.id('input-age')).typeText('25');
    await element(by.id('save-button')).tap();
    await element(by.id('save-button')).tap();
    await expect(element(by.id('input-display-age'))).toHaveText('25');
  });
});
