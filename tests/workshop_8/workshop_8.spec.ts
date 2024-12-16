import { expect, test } from "playwright/test";
import { PageObject } from "./page/Page";

test.describe("Sample Test", () => {
  let pageObject: PageObject;

  test.beforeEach(async ({ browser }) => {
    const page = await browser.newPage();
    pageObject = new PageObject(page);
    await pageObject.open(
      "file:///C:/Users/sang.nguyen/Documents/Thuc_tap_IDTEK/Palmer_Gitlab_Test/tests/workshop_8/index.html"
    );
  });

  test("Test 1: Fill all inputs", async () => {
    await pageObject.fillFirstName("Sang");
    await pageObject.fillAge("23");
    await pageObject.checkIsStudent();
    await pageObject.applyData();

    expect(await pageObject.text(pageObject.displayFirstName)).toBe("Sang");
    expect(await pageObject.text(pageObject.displayAge)).toBe("23");
    expect(await pageObject.text(pageObject.displayIsStudent)).toBe("Yes");
  });
});
