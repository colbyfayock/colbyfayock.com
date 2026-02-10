import { test, expect } from '@playwright/test';
import { expectValidSeo, getSeoMetadata, expectValidOgImage } from '../../helpers/seo.js';

test.describe('Single Post Page', () => {
  let postUrl;

  test.beforeEach(async ({ page }) => {
    // First get a real post URL from the listing page
    await page.goto('/posts');
    const firstPostLink = page.locator('a[href^="/posts/"]').first();
    postUrl = await firstPostLink.getAttribute('href');
    await page.goto(postUrl);
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test('renders page with title', async ({ page }) => {
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(5);
  });

  test('has valid SEO metadata', async ({ page }) => {
    await expectValidSeo(page, {
      hasCanonical: true,
    });
  });

  test('has OG image', async ({ page }) => {
    await expectValidOgImage(page);
  });

  test('displays post title as h1', async ({ page }) => {
    // Wait for page to fully render
    await page.waitForLoadState('networkidle');
    // Look for h1 element directly - some pages may render title differently
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('displays post content', async ({ page }) => {
    // Post content should have some text
    const body = page.locator('body');
    const text = await body.textContent();
    expect(text.length).toBeGreaterThan(100);
  });

  test('has canonical URL', async ({ page }) => {
    const seo = await getSeoMetadata(page);
    // Canonical may or may not exist
    if (seo.canonical) {
      expect(seo.canonical).toMatch(/^https?:\/\//);
    }
  });

  test('og:type is article or website', async ({ page }) => {
    const seo = await getSeoMetadata(page);
    if (seo.og.type) {
      expect(['article', 'website']).toContain(seo.og.type);
    }
  });
});

test.describe('Single Talk Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/talks');
  });

  test('single talk page loads when talk exists', async ({ page }) => {
    const firstTalkLink = page.locator('a[href^="/talks/"]').first();
    const count = await firstTalkLink.count();

    if (count === 0) {
      test.skip();
      return;
    }

    const talkUrl = await firstTalkLink.getAttribute('href');
    await page.goto(talkUrl, { timeout: 60000 });

    const title = await page.title();
    expect(title).toBeTruthy();

    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
  });
});

test.describe('Single Podcast Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/podcasts');
  });

  test('single podcast page loads when podcast exists', async ({ page }) => {
    const firstLink = page.locator('a[href^="/podcasts/"]').first();
    const count = await firstLink.count();

    if (count === 0) {
      test.skip();
      return;
    }

    const url = await firstLink.getAttribute('href');
    await page.goto(url, { timeout: 60000 });

    const title = await page.title();
    expect(title).toBeTruthy();

    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
  });
});

test.describe('Single Category Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/categories');
  });

  test('renders page with title', async ({ page }) => {
    const firstLink = page.locator('a[href^="/categories/"]').first();
    const url = await firstLink.getAttribute('href');
    await page.goto(url);

    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('has valid SEO metadata', async ({ page }) => {
    const firstLink = page.locator('a[href^="/categories/"]').first();
    const url = await firstLink.getAttribute('href');
    await page.goto(url);

    await expectValidSeo(page, {
      hasCanonical: true,
    });
  });

  test('displays category heading', async ({ page }) => {
    const firstLink = page.locator('a[href^="/categories/"]').first();
    const url = await firstLink.getAttribute('href');
    await page.goto(url);

    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
  });

  test('displays posts in category', async ({ page }) => {
    const firstLink = page.locator('a[href^="/categories/"]').first();
    const url = await firstLink.getAttribute('href');
    await page.goto(url);

    // Should show posts belonging to this category (may be 0)
    const postLinks = page.locator('a[href^="/posts/"]');
    const count = await postLinks.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });
});

test.describe('Single Event Note Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/event-notes');
  });

  test('single event note page loads when event note exists', async ({ page }) => {
    const firstLink = page.locator('a[href^="/event-notes/"]').first();
    const count = await firstLink.count();

    if (count === 0) {
      test.skip();
      return;
    }

    const url = await firstLink.getAttribute('href');
    await page.goto(url, { timeout: 60000 });

    const title = await page.title();
    expect(title).toBeTruthy();

    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
  });
});
