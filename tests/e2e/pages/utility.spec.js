import { test, expect } from '@playwright/test';
import { expectValidSeo } from '../../helpers/seo.js';

test.describe('404 Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/this-page-definitely-does-not-exist-12345');
  });

  test('renders 404 page', async ({ page }) => {
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('displays 404 message or heading', async ({ page }) => {
    // Look for common 404 indicators
    const pageContent = await page.content();
    const has404Content =
      pageContent.includes('404') ||
      pageContent.toLowerCase().includes('not found') ||
      pageContent.toLowerCase().includes("doesn't exist");
    expect(has404Content).toBe(true);
  });
});

test.describe('Newsletter Success Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/newsletter-success');
  });

  test('renders page', async ({ page }) => {
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('has valid SEO metadata', async ({ page }) => {
    await expectValidSeo(page);
  });

  test('displays page content', async ({ page }) => {
    const body = page.locator('body');
    const text = await body.textContent();
    expect(text.length).toBeGreaterThan(10);
  });
});

test.describe('Course Success Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/course-success');
  });

  test('renders page', async ({ page }) => {
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('has valid SEO metadata', async ({ page }) => {
    await expectValidSeo(page);
  });
});

test.describe('Course Confirm Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/course-confirm');
  });

  test('renders page', async ({ page }) => {
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('has valid SEO metadata', async ({ page }) => {
    await expectValidSeo(page);
  });
});

test.describe('Unsubscribe Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/unsubscribe');
  });

  test('renders page', async ({ page }) => {
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('has valid SEO metadata', async ({ page }) => {
    await expectValidSeo(page);
  });

  test('displays page content', async ({ page }) => {
    const body = page.locator('body');
    const text = await body.textContent();
    expect(text.length).toBeGreaterThan(10);
  });
});

test.describe('Course Unsubscribe Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/course-unsubscribe');
  });

  test('renders page', async ({ page }) => {
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('has valid SEO metadata', async ({ page }) => {
    await expectValidSeo(page);
  });
});
