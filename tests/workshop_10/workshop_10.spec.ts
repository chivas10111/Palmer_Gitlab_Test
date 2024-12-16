import { expect, test } from "playwright/test";

test("Interact with elements", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
  await page.goto("https://demo.playwright.dev/todomvc");
  // /html/body/section/div/section/ul/li[2]/div/label
  // body > section > div > section > ul > li:nth-child(2) > div > label
});

// Xử lý sự kiện screenshot
test("Screenshot", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
  await page.screenshot({ path: "fail.png" });
  await page.goto("https://demo.playwright.dev/todomvc");
});

// Xử lý sự kiện flaky (cố gắng thực hiện một hành động mà có thể gây ra lỗi)
test("Flaky", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");

  page.on("response", (response) => {
    console.log(`Received from: ${response.url()}`);  // In ra URL của phản hồi nhận được từ trang web
  });

  const flaky = Math.random() < 0.5; // Nếu giá trị nhỏ hơn 0.5, flaky sẽ là true; ngược lại, nó sẽ là false
  if (flaky) {
    await page.waitForTimeout(1000);
    await page.click(".non-existing-selector");   // Thực hiện nhấp chuột vào một element không tồn tại, điều này sẽ gây ra lỗi
  }
});
