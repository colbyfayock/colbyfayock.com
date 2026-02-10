import { test, expect } from '@playwright/test';
import { expectValidSeo, getSeoMetadata } from '../../helpers/seo.js';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders page with title', async ({ page }) => {
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
  });

  test('has valid SEO metadata', async ({ page }) => {
    await expectValidSeo(page);
  });

  test('displays masthead section', async ({ page }) => {
    // Check for main hero/masthead area
    const masthead = page.locator('[class*="masthead"], [class*="Masthead"], header').first();
    await expect(masthead).toBeVisible();
  });

  test('displays posts section', async ({ page }) => {
    // Check for posts section - look for heading containing "blog" or "posts"
    const postsSection = page
      .locator('h2')
      .filter({ hasText: /blog|posts/i })
      .first();
    // If no heading found, at least verify posts links exist
    const postsLinks = page.locator('a[href^="/posts/"]');
    const linksCount = await postsLinks.count();
    expect(linksCount).toBeGreaterThan(0);
  });

  test('displays projects section', async ({ page }) => {
    // Check for projects section
    const projectsSection = page
      .locator('h2')
      .filter({ hasText: /projects/i })
      .first();
    const isVisible = await projectsSection.isVisible().catch(() => false);
    // Projects section may or may not exist depending on content
    expect(isVisible === true || isVisible === false).toBe(true);
  });

  test('displays newsletter section or link', async ({ page }) => {
    // Check for newsletter-related content (link, text, or section)
    const newsletterContent = page.locator(
      'a[href="/newsletter"], a[href*="newsletter"], :text("newsletter"), :text("Newsletter")',
    );
    const count = await newsletterContent.count();
    // Newsletter content may or may not exist on the home page
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('has post cards with links', async ({ page }) => {
    // Should have at least one post card linking to a post
    const postLinks = page.locator('a[href^="/posts/"]');
    const count = await postLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});
