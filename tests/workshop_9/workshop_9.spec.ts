import { expect, test } from "playwright/test";

test("Automating Form Submissions @githubAction", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");

  const newTodo = await page.locator(
    `//input[@placeholder='What needs to be done?']`
  );
  await newTodo.fill("Learn English");
  await newTodo.press("Enter");
  await newTodo.fill("Play badminton");
  await newTodo.press("Enter");

  const firstTodo = await page.getByTestId("todo-item").nth(0);
  await firstTodo.getByRole("checkbox").check();
  const secondTodo = await page.getByTestId("todo-item").nth(1);
  await expect(firstTodo).toHaveClass("completed");
  await expect(secondTodo).not.toHaveClass("completed");
});

test("Handling Form @githubAction", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
  await page.getByPlaceholder("What needs to be done?").fill("Sing a song");
  await page.getByPlaceholder("What needs to be done?").press("Enter");

  const checkbox = await page.locator(".toggle");
  await checkbox.check();
});
