import { expect } from '@playwright/test';

/**
 * SEO metadata helper functions for E2E tests.
 * These test the actual rendered HTML output, not any library internals.
 */

/**
 * Get all SEO-related metadata from the page
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<Object>} SEO metadata object
 */
export async function getSeoMetadata(page) {
  return await page.evaluate(() => {
    const getMetaContent = (selector) => {
      const el = document.querySelector(selector);
      return el?.getAttribute('content') || null;
    };

    const getMetaProperty = (property) => {
      return getMetaContent(`meta[property="${property}"]`);
    };

    const getMetaName = (name) => {
      return getMetaContent(`meta[name="${name}"]`);
    };

    return {
      title: document.title,
      description: getMetaName('description'),
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || null,
      og: {
        title: getMetaProperty('og:title'),
        description: getMetaProperty('og:description'),
        image: getMetaProperty('og:image'),
        url: getMetaProperty('og:url'),
        type: getMetaProperty('og:type'),
        siteName: getMetaProperty('og:site_name'),
        imageWidth: getMetaProperty('og:image:width'),
        imageHeight: getMetaProperty('og:image:height'),
      },
      twitter: {
        title: getMetaProperty('twitter:title'),
        description: getMetaProperty('twitter:description'),
        image: getMetaProperty('twitter:image'),
        card: getMetaProperty('twitter:card'),
        site: getMetaProperty('twitter:site'),
      },
    };
  });
}

/**
 * Assert that a page has valid basic SEO metadata.
 * By default, validates that essential SEO elements exist.
 * Use options to make validation stricter or more lenient.
 *
 * @param {import('@playwright/test').Page} page
 * @param {Object} options - Expected values
 * @param {string} [options.titleContains] - Text the title should contain
 * @param {string} [options.titleEquals] - Exact title match
 * @param {boolean} [options.hasDescription=true] - Should have a description
 * @param {boolean} [options.hasCanonical=true] - Should have a canonical URL
 * @param {boolean} [options.hasOgTags=true] - Should have Open Graph tags
 * @param {boolean} [options.hasTwitterTags=true] - Should have Twitter tags
 * @param {boolean} [options.strict=false] - If false, missing OG/Twitter tags are warnings only
 */
export async function expectValidSeo(page, options = {}) {
  const {
    titleContains,
    titleEquals,
    hasDescription = true,
    hasCanonical = true,
    hasOgTags = true,
    hasTwitterTags = true,
    strict = false,
  } = options;

  const seo = await getSeoMetadata(page);
  const warnings = [];

  // Title validation - always required
  expect(seo.title, 'Page should have a title').toBeTruthy();
  expect(seo.title.length, 'Title should not be empty').toBeGreaterThan(0);

  if (titleEquals) {
    expect(seo.title).toBe(titleEquals);
  }

  if (titleContains) {
    expect(seo.title.toLowerCase()).toContain(titleContains.toLowerCase());
  }

  // Description validation
  if (hasDescription) {
    if (strict) {
      expect(seo.description, 'Page should have a meta description').toBeTruthy();
      expect(seo.description.length, 'Description should be reasonable length').toBeGreaterThan(10);
    } else if (!seo.description) {
      warnings.push('Missing meta description');
    }
  }

  // Canonical validation
  if (hasCanonical) {
    if (strict) {
      expect(seo.canonical, 'Page should have a canonical URL').toBeTruthy();
      expect(seo.canonical).toMatch(/^https?:\/\//);
    } else if (!seo.canonical) {
      warnings.push('Missing canonical URL');
    } else if (seo.canonical && !seo.canonical.match(/^https?:\/\//)) {
      warnings.push('Invalid canonical URL format');
    }
  }

  // Open Graph validation
  if (hasOgTags) {
    if (strict) {
      expect(seo.og.title, 'Page should have og:title').toBeTruthy();
      expect(seo.og.description, 'Page should have og:description').toBeTruthy();
      expect(seo.og.url, 'Page should have og:url').toBeTruthy();
    } else {
      if (!seo.og.title) warnings.push('Missing og:title');
      if (!seo.og.description) warnings.push('Missing og:description');
      if (!seo.og.url) warnings.push('Missing og:url');
    }
  }

  // Twitter validation
  if (hasTwitterTags) {
    if (strict) {
      expect(seo.twitter.title, 'Page should have twitter:title').toBeTruthy();
      expect(seo.twitter.description, 'Page should have twitter:description').toBeTruthy();
    } else {
      if (!seo.twitter.title) warnings.push('Missing twitter:title');
      if (!seo.twitter.description) warnings.push('Missing twitter:description');
    }
  }

  // Log warnings for missing optional SEO elements
  if (warnings.length > 0) {
    console.warn(`SEO warnings for ${page.url()}: ${warnings.join(', ')}`);
  }

  return seo;
}

/**
 * Assert that a page has a valid OG image
 * @param {import('@playwright/test').Page} page
 * @param {boolean} [strict=false] - If false, missing og:image is a warning only
 */
export async function expectValidOgImage(page, strict = false) {
  const seo = await getSeoMetadata(page);

  if (strict) {
    expect(seo.og.image, 'Page should have og:image').toBeTruthy();
    expect(seo.og.image).toMatch(/^https?:\/\//);
  } else if (!seo.og.image) {
    console.warn(`SEO warning for ${page.url()}: Missing og:image`);
  } else {
    expect(seo.og.image).toMatch(/^https?:\/\//);
  }

  return seo;
}

/**
 * Get a summary of SEO completeness for a page
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<{score: number, missing: string[], present: string[]}>}
 */
export async function getSeoScore(page) {
  const seo = await getSeoMetadata(page);
  const checks = {
    title: !!seo.title,
    description: !!seo.description,
    canonical: !!seo.canonical,
    'og:title': !!seo.og.title,
    'og:description': !!seo.og.description,
    'og:url': !!seo.og.url,
    'og:image': !!seo.og.image,
    'twitter:title': !!seo.twitter.title,
    'twitter:description': !!seo.twitter.description,
  };

  const present = Object.entries(checks)
    .filter(([, v]) => v)
    .map(([k]) => k);
  const missing = Object.entries(checks)
    .filter(([, v]) => !v)
    .map(([k]) => k);

  return {
    score: Math.round((present.length / Object.keys(checks).length) * 100),
    present,
    missing,
  };
}
