import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  const searchbar = await page.waitForSelector(
    'input[placeholder="type in location..."]'
  );
  await searchbar.type("Smile House Cafe");
  await page.locator('li:has-text("Smile House Cafe")').click();
});

test("should display sidebar on 'Picks' page", async ({ page }) => {
  const sidebar = await page.locator("div.sidebar");
  await expect(sidebar).toBeVisible();
});

test("should display selected location name in sidebar heading", async ({
  page,
}) => {
  const heading = await page.locator('h2:has-text("Smile House Cafe")');
  await expect(heading).toBeVisible();
});

test("should display selected location image in sidebar", async ({ page }) => {
  const attractionImage = await page.getByAltText("attraction photo");
  await expect(attractionImage).toBeTruthy();
});

test("should change 'save pick' button to 'saved' after clicking it", async ({
  page,
}) => {
  await page
    .getByRole("button", {
      name: "save pick",
      exact: true,
    })
    .click();
  await expect(
    page.getByRole("button", { name: "saved", exact: true })
  ).toBeVisible();
});

test("should change 'saved' button to 'save pick' after clicking it", async ({
  page,
}) => {
  await page
    .getByRole("button", {
      name: "save pick",
      exact: true,
    })
    .click();
  await page
    .getByRole("button", {
      name: "saved",
      exact: true,
    })
    .click();
  await expect(
    page.getByRole("button", { name: "save pick", exact: true })
  ).toBeVisible();
});

// TODO:
// test("should save pick to saved list", async ({ page }) => {
// });
