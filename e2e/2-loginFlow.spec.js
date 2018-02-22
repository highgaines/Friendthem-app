describe('Login Flow', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('clicking on LOG IN HERE button renders LoginScreen', async () => {
    await element(by.id('login_button')).tap();
    await expect(element(by.text('LOG IN'))).toBeVisible()
  })

  it('able to correctly log in when password is correct', async () => {
    await element(by.id('login_button')).tap();
    await expect(element(by.text('LOG IN'))).toBeVisible()
    await element(by.id('email_input'))
    await element(by.id('email_input')).typeText('naz@simplefractal.com');
    await element(by.id('password_input')).typeText('snap');
    await element(by.id('start_button')).tap();
    await expect(element(by.text('Welcome!'))).toBeVisible()
  })

  it('unable to log in when password is incorrect', async () => {
    await element(by.id('login_button')).tap();
    await expect(element(by.text('LOG IN'))).toBeVisible()
    await element(by.id('email_input'))
    await element(by.id('email_input')).typeText('naz@simplefractal.com');
    await element(by.id('password_input')).typeText('wrongpassword');
    await element(by.id('start_button')).tap();
    await element(by.text('The information you entered was incorrect.'))
  })
})
