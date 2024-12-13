import { expect, test } from "playwright/test";

test("Test create an account in Palmer", async ({ page }) => {
  await page.goto("https://www.palmers.com/");
  await page.locator(`//div[@class='header-user-info']`).click();
  await page
    .locator(`//a[@href='https://www.palmers.com/login?create_account=1']`)
    .click();
  await page.locator(`//input[@id='field-firstname']`).fill("SANG");
  await page.locator(`//input[@id='field-lastname']`).fill("NGUYEN");
  await page.locator(`//input[@id='field-address1']`).fill("Vietnam");
  await page.locator(`//input[@id='field-address2']`).fill("USA");
  await page.locator(`//input[@id='field-company']`).fill("IDTEK");
  await page.locator(`//input[@id='field-city']`).fill("Washington");

  // Xu ly dropdown state
  await page.locator(`//span[@id='select2-field-id_state-container']`).click();
  await page
    .locator(`//div[contains(@class,'id_state')]`)
    .getByLabel("State")
    .selectOption("Hawaii");
  await page.locator(`//span[@id='select2-field-id_state-container']`).click();

  await page.locator(`//input[@id='field-postcode']`).fill("96815");
  await page.locator(`//input[@id='field-phone']`).fill("0123456789");
  await page
    .locator(`//input[@id='field-email']`)
    .fill("Huy.voquqng@gmail.com");
  await page
    .locator(`//input[@id='field-confirm_email']`)
    .fill("Huy.voquqng@gmail.com");
  await page.fill('input[type="password"]', "your_password");
  await page
    .locator(`//input[@id='field-confirm_password']`)
    .fill("your_password");

  await page.locator(`//span[contains(@id,'select2-birthdayMonth')]`).click();
  await page
    .locator(`//select[contains(@name, 'birthday[Month]')]`)
    .selectOption("May");
  await page.locator(`//span[contains(@id,'select2-birthdayMonth')]`).click();

  await page.locator(`//span[contains(@id,'select2-birthdayDay')]`).click();
  await page
    .locator(`//select[contains(@name, 'birthday[Day]')]`)
    .selectOption("26");
  await page.locator(`//span[contains(@id,'select2-birthdayDay')]`).click();

  await page.locator(`//span[contains(@id,'select2-birthdayYear')]`).click();
  await page
    .locator(`//select[contains(@name, 'birthday[Year]')]`)
    .selectOption("2001");
  await page.locator(`//span[contains(@id,'select2-birthdayYear')]`).click();

  await page.locator(`//button[@id='submit-reg-form']`).click();
  await page.waitForTimeout(3000); // Hoan viec test 3s
});

test("Test add to cart in Palmer", async ({ page }) => {
  await page.goto("https://www.palmers.com/");
  // await page.locator(`//input[@name='pla_quantity_325']`).fill("3");  //Option 1
  await page
    .locator(
      `//article[contains(@class, '325')]//div[contains(@class, 'pla-qty-plus')][normalize-space()='+']`
    )
    .click({ button: "left", clickCount: 3 }); //Option 2
  await page
    .locator(
      `//article[contains(@data-id-product,'325')]//a[@title='Add to cart']`
    )
    .click();
  await page.locator(`//button[normalize-space()='CONTINUE SHOPPING']`).click();
  await page.locator(`//span[contains(@id,'attribute_7_4-container')]`).click();
  await page.locator(`//li[normalize-space()='3.5 oz']`).click();
  await page
    .locator(
      `//article[contains(@class, 'pla_block pla_block_7')]//div[contains(@class, 'pla-qty-plus')][normalize-space()='+']`
    )
    .click({ button: "left", clickCount: 1 });
  await page
    .locator(
      `//article[contains(@class, 'pla_block pla_block_7')]//a[@title='Add to cart']`
    )
    .click();
  await page.locator(`//button[normalize-space()='CONTINUE SHOPPING']`).click();
  await page.waitForTimeout(3000); // Hoan viec test 3s
});

test("Advanced Interactions", async ({ page }) => {
  // Xu ly interaction hover
  await page.goto(
    "file:///C:/Users/sang.nguyen/Documents/Thuc_tap_IDTEK/Palmer_Gitlab_Test/tests/workshop_3/index.html"
  );
  await page.locator(`//button[contains(@id,'hover')]`).hover();
  expect(await page.textContent("button#hover-me")).toContain("Text Changed!"); // Kiểm tra xem text của button có bị thay đổi thành Text Changed khi hover qua không

  // Xu ly interaction right click
  await page
    .locator(`//button[contains(@id,'context')]`)
    .click({ button: "right" });
  expect(await page.getByText("Context Menu Appears!").textContent()).toContain(
    "Context Menu Appears!"
  ); // Kiểm tra xem khi click chuột phải vào button có xuất hiện chữ Context Menu Appears! không

  // Xu ly interaction double click
  await page.locator(`//button[contains(@id,'double')]`).dblclick();
  expect(await page.locator("img").count()).toBe(1); // Kiểm tra xem khi double click vào button có xuất hiện 1 hình ảnh hay không
});

test('Drag and Drop', async ({page}) => { 
    // Xu ly interation drag and drop
  await page.goto(
    "file:///C:/Users/sang.nguyen/Documents/Thuc_tap_IDTEK/Palmer_Gitlab_Test/tests/workshop_3/index.html"
  );
  await page.dragAndDrop('.drag-source', '.drop-target');
  expect(await page.textContent('.drop-target')).toContain("Success");
 })
