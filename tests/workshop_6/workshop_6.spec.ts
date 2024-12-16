import { expect, test } from "playwright/test";

const testData = {
  firstName: "Sang",
  lastName: "Nguyen",
  address: "Vietnam",
  number: "0123456789",
};

// Xử lý form đăng kí
test.describe("User Registration Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      "file:///C:/Users/sang.nguyen/Documents/Thuc_tap_IDTEK/Palmer_Gitlab_Test/tests/workshop_6/index.html"
    );
  });
  // Xử lý khi người dùng điền đủ form
  test("Register with valid data", async ({ page }) => {
    await page.fill("#firstName", testData.firstName);
    await page.fill("#lastName", testData.lastName);
    await page.fill("#address", testData.address);
    await page.fill("#number", testData.number);
    await page.click("#register");

    const firstNameText = await page.locator("#displayFirstName").textContent(); // Lấy giá trị của trường Firstname lưu vào biến firstnameText
    const lastNameText = await page.locator("#displayLastName").textContent();
    const addressText = await page.locator("#displayAddress").textContent();
    const numberText = await page.locator("#displayNumber").textContent();
    await page.waitForTimeout(3000);

    await expect(firstNameText).toEqual(testData.firstName); // Kiểm tra xem các giá trị bên dưới form có khớp với dữ liệu khi đăng kí không
    await expect(lastNameText).toEqual(testData.lastName);
    await expect(addressText).toEqual(testData.address);
    await expect(numberText).toEqual(testData.number);
  });
  // Xử lý khi người dùng chỉ điền một vài trường trong form
  test("Register with empty fields", async ({ page }) => {
    await page.fill("#firstName", testData.firstName);
    await page.fill("#lastName", testData.lastName);
    await page.click("#register");
    const error = await page.locator("#error p").textContent(); // Lấy giá trị của ô error lưu vào biến error

    expect(error).toBe("Please fill in all fields."); // Kiểm tra xem ô error có hiển thị đúng giá trị Please fill in all fields.
  });
  // Xử lý khi người dùng không điền trường trong form và click đăng kí
  test.only("Register with all empty fields", async ({ page }) => {
    await page.click("#register");
    const error = await page.locator("#error p").textContent(); // Lấy giá trị của ô error lưu vào biến error
    expect(error).toBe("Please fill in all fields."); // Kiểm tra xem ô error có hiển thị đúng giá trị Please fill in all fields.
  });
});
