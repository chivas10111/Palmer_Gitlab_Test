import { expect, test } from "playwright/test";

test("Test todo app", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
  const newTodo = await page.getByPlaceholder("What needs to be done?");
  await newTodo.fill("Do homework"); // Them task 1
  await newTodo.press("Enter");
  await newTodo.fill("Clean my room"); // Them task 2
  await newTodo.press("Enter");
  await newTodo.fill("Take a shower"); // Them task 3
  await newTodo.press("Enter");
  await page.waitForTimeout(3000); // Hoan viec test 3s

  const firstTodo = await page.getByTestId("todo-item").nth(0); // Lay task 1
  await firstTodo.getByRole("checkbox").check(); // Check task 1

  const secondTodo = await page.getByTestId("todo-item").nth(1);
  await expect(secondTodo).not.toHaveClass("completed");
  await expect(firstTodo).toHaveClass("completed");

  const thirdTodo = await page.getByTestId("todo-item").nth(2);
  await thirdTodo.hover();
  await thirdTodo.locator(`//button[@class='destroy']`).click();
  await page.waitForTimeout(3000);
});

test.only("Handling Form", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
  const placeholder = await page.getByPlaceholder("What needs to be done?");
  await placeholder.fill("Hang out");
  await placeholder.press("Enter");
  const checkbox = await page.locator(".toggle");
  await checkbox.check();
  await page.waitForTimeout(3000); // Hoan viec test 3s
});
