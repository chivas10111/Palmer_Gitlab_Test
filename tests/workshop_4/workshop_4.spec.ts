import { expect, test } from "playwright/test";

// Xử lý alert
test("Handling Alerts", async ({ page }) => {
  await page.goto(
    "file:///C:/Users/sang.nguyen/Documents/Thuc_tap_IDTEK/Palmer_Gitlab_Test/tests/workshop_4/index.html"
  );
  let allertMessage = "";
  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toBe("alert"); // Kiểm tra loại của dialog là alert
    allertMessage = await dialog.message(); // Lấy message của dialog và bỏ vào biến allertMesage
    await dialog.accept(); // Click nút OK khi dialog xuất hiện
  });
  await page.click("#show-alert");
  expect(allertMessage).toBe("This is a simple alert."); // Kiểm tra xem thông điệp của alert có đúng là "This is a simple alert." hay không
});

// Xử lý Confirm Alert
test("Confirm Alert", async ({ page }) => {
  await page.goto(
    "file:///C:/Users/sang.nguyen/Documents/Thuc_tap_IDTEK/Palmer_Gitlab_Test/tests/workshop_4/index.html"
  );
  let allertMessage = "";
  page.on("dialog", async (dialog) => {
    allertMessage = dialog.message(); // Lấy message của dialog và bỏ vào biến allertMesage
    await page.waitForTimeout(4000);
    await dialog.dismiss(); // Click nút cancel khi dialog xuất hiện
  });
  await page.click("#show-confirm");
  expect(allertMessage).toBe("You clicked Cancel."); // Kiểm tra xem thông điệp của alert có đúng là "You clicked Cancel." hay không
});

// Xử lý pop-up
test("Handling pop-up", async ({ page }) => {
  await page.goto(
    "file:///C:/Users/sang.nguyen/Documents/Thuc_tap_IDTEK/Palmer_Gitlab_Test/tests/workshop_4/index.html"
  );
  const [popup] = await Promise.all([  // Chờ đồng thời cả hai hành động: đợi xuất hiện pop-up và nhấp vào nút để mở pop-up.
    page.waitForEvent("popup"),  // Đợi sự kiện pop-up xuất hiện
    page.click("#open-popup"), 
  ]);

  await popup.waitForLoadState(); // Chờ pop-up load xong
  await popup.close();  // Đóng pop-up
});
