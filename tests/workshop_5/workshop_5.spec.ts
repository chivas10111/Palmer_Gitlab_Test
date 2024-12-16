import { test, expect } from "playwright/test";

// Xử lý mở tab mới
test("Open new window and navigate back", async ({ context, page }) => {
  await page.goto(
    "file:///C:/Users/sang.nguyen/Documents/Thuc_tap_IDTEK/Palmer_Gitlab_Test/tests/workshop_5/index.html"
  );
  const pagePromise = context.waitForEvent("page"); // Tạo một promise để chờ cửa sổ mới xuất hiện
  await page.click("#openNewWindow");
  const newPage = await pagePromise; // Tạo một đối tượng từ browser context pagePromise
  await newPage.waitForLoadState(); // Chờ cho cửa sổ mới load xong
  await expect(
    newPage.getByRole("heading", { name: "Welcome to the New Page" })
  ).toBeVisible(); // Kiểm tra xem tiêu đề trang mới có phải là Welcome to the New Page không
});

// Xử lý thêm cookie vào browser
test("Add cookie", async ({ page }) => {
  await page.goto(
    "file:///C:/Users/sang.nguyen/Documents/Thuc_tap_IDTEK/Palmer_Gitlab_Test/tests/workshop_5/index.html"
  );
  await page.click("#setCookie");
  const cookies = await page
    .context()
    .cookies(
      "file:///C:/Users/sang.nguyen/Documents/Thuc_tap_IDTEK/Palmer_Gitlab_Test/tests/workshop_5/index.html"
    ); // Lấy tất cả các cookies từ trang hiện tại và lưu vào biến cookies
  const sessionCookie = cookies.find((cookies) => cookies.name === "session"); // Tìm cookie có name là session và lưu vào biến sessionCookie
  console.log("Session cookie", sessionCookie);
  await expect(sessionCookie).toBeDefined(); // Kiểm tra xem cookie session có tồn tại không
});

// Xử lý xóa cookie
test("Delete cookie", async ({ page }) => {
  await page.goto(
    "file:///C:/Users/sang.nguyen/Documents/Thuc_tap_IDTEK/Palmer_Gitlab_Test/tests/workshop_5/index.html"
  );
  await page.click("#setCookie");
  const cookies = await page
    .context()
    .cookies(
      "file:///C:/Users/sang.nguyen/Documents/Thuc_tap_IDTEK/Palmer_Gitlab_Test/tests/workshop_5/index.html"
    ); // Lấy tất cả các cookies từ trang hiện tại và lưu vào biến cookies
  const sessionCookie = cookies.find((cookies) => cookies.name === "session"); // Tìm cookie có name là session và lưu vào biến sessionCookie
  console.log("Session cookie", sessionCookie);

  await page.click("#deleteCookie");
  const deletedCookies = await page
    .context()
    .cookies(
      "file:///C:/Users/sang.nguyen/Documents/Thuc_tap_IDTEK/Palmer_Gitlab_Test/tests/workshop_5/index.html"
    );
  const deletedSessionCookie = deletedCookies.find(
    (cookies) => cookies.name === "session"
  );
  console.log("Session cookie", deletedSessionCookie);
  await expect(deletedSessionCookie).toBeUndefined(); // Kiểm tra cookie này có tồn tại không. Nếu cookie này không tồn tại, kiểm tra sẽ thành công.
});
