describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should render launch screen', async () => {
    await expect(element(by.text('CONNECTING THE WORLD'))).toBeVisible();
  });

  it('should render LOG IN HERE button', async () => {
    await expect(element(by.id('login_button'))).toBeVisible();
    // await expect(element(by.text('Hello!!!'))).toBeVisible();
  });

  it('clicking on LOG IN HERE button renders LoginScreen', async () => {
    await element(by.id('login_button')).tap();
    await expect(element(by.text('LOG IN'))).toBeVisible()
  })

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
})
