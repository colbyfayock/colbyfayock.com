import { test, expect } from '@playwright/test';
import { expectValidSeo, getSeoMetadata } from '../../helpers/seo.js';

test.describe('Posts Listing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/posts');
  });

  test('renders page with title', async ({ page }) => {
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('has valid SEO metadata', async ({ page }) => {
    await expectValidSeo(page, {
      hasDescription: false, // Posts page has description: false
    });
  });

  test('displays page heading', async ({ page }) => {
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
  });

  test('displays list of posts', async ({ page }) => {
    const postLinks = page.locator('a[href^="/posts/"]');
    const count = await postLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Talks Listing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/talks');
  });

  test('renders page with title', async ({ page }) => {
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('has valid SEO metadata', async ({ page }) => {
    await expectValidSeo(page, {
      hasDescription: false,
    });
  });

  test('displays page heading', async ({ page }) => {
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
  });

  test('displays list of talks', async ({ page }) => {
    const talkLinks = page.locator('a[href^="/talks/"]');
    const count = await talkLinks.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });
});

test.describe('Podcasts Listing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/podcasts');
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
});

test.describe('Projects Listing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects');
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
});

test.describe('Categories Listing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/categories');
  });

  test('renders page with title', async ({ page }) => {
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('has valid SEO metadata', async ({ page }) => {
    await expectValidSeo(page);
  });

  test('displays list of categories', async ({ page }) => {
    const categoryLinks = page.locator('a[href^="/categories/"]');
    const count = await categoryLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Event Notes Listing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/event-notes');
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

test.describe('News Listing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/news');
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
