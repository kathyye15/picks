import { test, expect } from "@playwright/test";

test("should test empty input value", async ({ page }) => {
  await page.goto("/");
  const searchbar = await page.waitForSelector(
    'input[placeholder="type in location..."]'
  );
  const searchbarValue = await searchbar.inputValue();
  expect(searchbarValue).toBe("");
});

test("should match input value after typing", async ({ page }) => {
  await page.goto("/");
  const searchbar = await page.waitForSelector(
    'input[placeholder="type in location..."]'
  );
  await searchbar.type(
    "Smile House Cafe, Taraval Street, San Francisco, CA, USA"
  );
  const searchbarValue = await searchbar.inputValue();
  expect(searchbarValue).toBe(
    "Smile House Cafe, Taraval Street, San Francisco, CA, USA"
  );
});

test("should display matching address in autocomplete dropdown for partial input", async ({
  page,
}) => {
  await page.goto("/");
  const searchbar = await page.waitForSelector(
    'input[placeholder="type in location..."]'
  );
  await searchbar.type("Smile House Cafe");
  const matchingAddress = await page
    .locator('li:has-text("Smile House Cafe")')
    .textContent();
  expect(matchingAddress).toContain(
    "Smile House Cafe, Taraval Street, San Francisco, CA, USA"
  );
});

test("should navigate to 'Picks' page after selecting an address from the dropdown list", async ({
  page,
}) => {
  await page.goto("/");
  const searchbar = await page.waitForSelector(
    'input[placeholder="type in location..."]'
  );
  await searchbar.type("Smile House Cafe");
  await page.locator('li:has-text("Smile House Cafe")').click();
  await expect(page).toHaveURL("/picks");
});
