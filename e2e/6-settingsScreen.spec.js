describe('Settings Screen', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('log in and get to homescreen', async () => {
    await element(by.id('login_button')).tap();
    await expect(element(by.text('LOG IN'))).toBeVisible()
    await element(by.id('email_input'))
    await element(by.id('email_input')).typeText('naz@simplefractal.com');
    await element(by.id('password_input')).typeText('snap');
    await element(by.id('start_button')).tap();
    await expect(element(by.text('Welcome!'))).toBeVisible()
    await element(by.text('FIND PEOPLE NEARBY')).tap();
    await element(by.id('start-button')).tap();
    await expect(element(by.id('nearby_users_container'))).toBeVisible()
    await element(by.id('settings-navbar-button')).tap()
    await expect(element(by.text('General Settings'))).toBeVisible()
  })
})
