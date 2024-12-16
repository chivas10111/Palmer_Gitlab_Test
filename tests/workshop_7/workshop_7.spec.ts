import { expect, test } from "playwright/test";

const selectors = {
  firstName: "#firstName",
  age: "#age",
  student: "#isStudent",
};

// Xử lý form có ô check và input number theo kiểu khai báo selector và khai báo type cho value
test.describe("Variable Declarations and Types", async () => {
  test("Declarations and Types", async ({ page }) => {
    let firstName: string = "Sang";
    let age: number = 23;
    await page.goto(
      "file:///C:/Users/sang.nguyen/Documents/Thuc_tap_IDTEK/Palmer_Gitlab_Test/tests/workshop_7/index.html"
    );
    await page.fill(selectors.firstName, firstName);
    await page.fill(selectors.age, age.toString());
    await page.check("#isStudent");
    await page.click("#applyData");

    expect(await page.textContent("#displayFirstName")).toBe(firstName);
    expect(await page.textContent("#displayAge")).toContain(age.toString());
    expect(await page.textContent("#displayIsStudent")).toBe("Yes");
  });
});

// Xử lý form có ô check và input number theo kiểu khai báo selector và định nghĩa interface cho value
test.describe("Type Definitions and Interfaces", async () => {
  type User = {
    firstName: string;
    age: number;
    isStudent: boolean;
  };

  let user: User = {
    firstName: "Sang",
    age: 23,
    isStudent: true,
  };
  test("Type Def and Interfaces", async ({ page }) => {
    await page.goto(
      "file:///C:/Users/sang.nguyen/Documents/Thuc_tap_IDTEK/Palmer_Gitlab_Test/tests/workshop_7/index.html"
    );
    await page.fill(selectors.firstName, user.firstName);
    await page.fill(selectors.age, user.age.toString());
    await page.click("#applyData");

    expect(await page.textContent("#displayFirstName")).toBe(user.firstName);
    expect(await page.textContent("#displayAge")).toContain(
      user.age.toString()
    );
    expect(await page.isChecked(selectors.student)).not.toBe(user.isStudent);  // Kiểm tra xem ô Student có check không. Nếu mang giá trị false (không check) là đúng
  });
});
