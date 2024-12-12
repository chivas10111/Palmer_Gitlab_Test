import { test } from "playwright/test";

test("Basic Navigation", async ({ page }) => {
  await page.goto("https://gitlab.com/");
  await page.waitForTimeout(3000);
  await page.reload();
});

test.only("Test Get free trial on gitlab", async ({ page }) => {
  await page.goto("https://gitlab.com/");
  //   await page.locator(`//a[@name='Get free trial']`).click();
  await page
    .locator(
      `//div[@class='hero-scroll-gallery__content-block']//div[@class='slp-mb-16 slp-mt-24']//a[normalize-space()='Get free trial']`
    )
    .click(); 
  await page.locator(`//input[@id='new_user_first_name']`).fill("Sang");
  await page.locator(`//input[@name='new_user[last_name]']`).fill("Nguyen");
  await page.locator(`//input[@id='new_user_username']`).fill("thengsoon");
  await page
    .locator(`//input[@id='new_user_email']`)
    .fill("nguyenthanhsang20012017@gmail.com");
  await page.locator(`//input[@id='new_user_password']`).fill("Idtek@2024");
  await page
    .locator(`//button[@data-testid='new-user-register-button']`)
    .click();
});

test("Test access flatform engineer on gitlab", async ({ page }) => {
  await page.goto("https://gitlab.com/");
  await page.locator(`//button[@name='Platform']`).hover();
  await page
    .locator(`//span[normalize-space()='Platform Engineering']`)
    .click();
});
