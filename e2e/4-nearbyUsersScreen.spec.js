describe('Nearby Users Screen', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('renders nearby users screen correctly', async () => {
    await element(by.id('login_button')).tap();
    await expect(element(by.text('LOG IN'))).toBeVisible()
    await element(by.id('email_input'))
    await element(by.id('email_input')).typeText('naz@simplefractal.com');
    await element(by.id('password_input')).typeText('snap');
    await element(by.id('start_button')).tap();
    await expect(element(by.text('Welcome!'))).toBeVisible()
    await element(by.id('go_to_nearby_users').withDescendant(by.id('connect_button'))).tap()
    await expect(element(by.id('nearby_users_container'))).toBeVisible()
  })
})
