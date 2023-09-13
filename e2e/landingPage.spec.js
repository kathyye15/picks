import { test, expect } from "@playwright/test";

test("should navigate to base URL on initial load", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("/");
});

test("should have 'picks' in the page title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/picks/);
});

test("should have picks icon", async ({ page }) => {
  await page.goto("/");
  const logo = await page.getByAltText("picks icon");
  await expect(logo).toBeTruthy();
});

test("should have PlacesAutocomplete searchbar", async ({ page }) => {
  await page.goto("/");
  const searchbar = await page.waitForSelector(
    'input[placeholder="type in location..."]'
  );
  await expect(searchbar).toBeTruthy();
});
