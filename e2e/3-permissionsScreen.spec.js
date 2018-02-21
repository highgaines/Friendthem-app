<<<<<<< HEAD:e2e/permissionsScreen.spec.js
// describe('Permissions Screen', () => {
//   beforeEach(async () => {
//     await device.reloadReactNative();
//   });
//
//   it('renders permission screens correctly', async () => {
//     await element(by.id('login_button')).tap();
//     await expect(element(by.text('LOG IN'))).toBeVisible()
//     await element(by.id('email_input'))
//     await element(by.id('email_input')).typeText('naz@simplefractal.com');
//     await element(by.id('password_input')).typeText('snap');
//     await element(by.id('start_button')).tap();
//     await element(by.text('WE WOULD LIKE TO ACCESS YOUR LOCATION'))
//     await expect(element(by.id('connect_button_okay').withDescendant(by.id('connect_button')))).toBeVisible()
//     await element(by.id('connect_button_okay').withDescendant(by.id('connect_button'))).tap();
//     await element(by.text('WE WOULD ALSO LIKE TO SEND YOU NOTIFICATIONS'))
//     await element(by.id('connect_button_okay').withDescendant(by.id('connect_button'))).atIndex(0).tap()
//     await expect(element(by.text('Welcome!'))).toBeVisible()
//   })
// })
=======
describe('Permissions Screens and Fork Screen', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('renders permission screens and fork screen correctly', async () => {
    await element(by.id('login_button')).tap();
    await expect(element(by.text('LOG IN'))).toBeVisible()
    await element(by.id('email_input'))
    await element(by.id('email_input')).typeText('naz@simplefractal.com');
    await element(by.id('password_input')).typeText('snap');
    await element(by.id('start_button')).tap();
    await element(by.text('WE WOULD LIKE TO ACCESS YOUR LOCATION'))
    await expect(element(by.id('connect_button_okay').withDescendant(by.id('connect_button')))).toBeVisible()
    await element(by.id('connect_button_okay').withDescendant(by.id('connect_button'))).tap();
    await element(by.text('WE WOULD ALSO LIKE TO SEND YOU NOTIFICATIONS'))
    await element(by.id('connect_button_okay').withDescendant(by.id('connect_button'))).atIndex(0).tap()
    await expect(element(by.text('Welcome!'))).toBeVisible()
  })
})
>>>>>>> changed file names and added nearby users test:e2e/3-permissionsScreen.spec.js
