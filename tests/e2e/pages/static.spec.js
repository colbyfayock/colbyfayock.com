import { test, expect } from '@playwright/test';
import { expectValidSeo } from '../../helpers/seo.js';

test.describe('Newsletter Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/newsletter');
  });

  test('renders page with title', async ({ page }) => {
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('has valid SEO metadata', async ({ page }) => {
    await expectValidSeo(page);
  });

  test('displays page heading', async ({ page }) => {
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
  });

  test('displays form elements', async ({ page }) => {
    // Should have an email input or form element
    const formElements = page.locator('form, input[type="email"], input[type="text"], button');
    const count = await formElements.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Uses Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uses');
  });

  test('renders page with title', async ({ page }) => {
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('has valid SEO metadata', async ({ page }) => {
    await expectValidSeo(page);
  });

  test('displays page heading', async ({ page }) => {
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
  });

  test('displays content', async ({ page }) => {
    const body = page.locator('body');
    const text = await body.textContent();
    expect(text.length).toBeGreaterThan(100);
  });
});

test.describe('Search Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/search');
  });

  test('renders page with title', async ({ page }) => {
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('has valid SEO metadata', async ({ page }) => {
    await expectValidSeo(page);
  });

  test('displays page heading', async ({ page }) => {
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
  });

  test('displays input elements', async ({ page }) => {
    const inputs = page.locator('input, button');
    const count = await inputs.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Course Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/course');
  });

  test('renders page', async ({ page }) => {
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('has valid SEO metadata', async ({ page }) => {
    await expectValidSeo(page);
  });

  test('displays page heading', async ({ page }) => {
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
  });
});
