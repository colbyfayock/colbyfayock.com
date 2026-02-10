import { describe, it, expect } from 'vitest';
import { helmetSettingsFromMetadata, constructPageMetadata } from 'lib/site';

describe('helmetSettingsFromMetadata', () => {
  it('generates title from metadata', () => {
    const metadata = {
      title: 'Test Page Title',
      description: 'A test description for the page',
      language: 'en',
    };

    const result = helmetSettingsFromMetadata(metadata);

    expect(result.title).toBe('Test Page Title');
  });

  it('sets html lang attribute', () => {
    const metadata = {
      title: 'Test',
      language: 'en',
    };

    const result = helmetSettingsFromMetadata(metadata);

    expect(result.htmlAttributes.lang).toBe('en');
  });

  it('generates canonical link', () => {
    const metadata = {
      title: 'Test',
      canonical: 'https://example.com/test-page',
    };

    const result = helmetSettingsFromMetadata(metadata);

    const canonicalLink = result.link.find((l) => l.rel === 'canonical');
    expect(canonicalLink).toBeDefined();
    expect(canonicalLink.href).toBe('https://example.com/test-page');
  });

  it('generates description meta tag', () => {
    const metadata = {
      title: 'Test',
      description: 'This is a test description',
    };

    const result = helmetSettingsFromMetadata(metadata);

    const descriptionMeta = result.meta.find((m) => m.name === 'description');
    expect(descriptionMeta).toBeDefined();
    expect(descriptionMeta.content).toBe('This is a test description');
  });

  it('generates Open Graph meta tags', () => {
    const metadata = {
      title: 'Test Title',
      description: 'Test description',
      og: {
        title: 'OG Title',
        description: 'OG Description',
        url: 'https://example.com/page',
        imageUrl: 'https://example.com/image.png',
        type: 'article',
      },
    };

    const result = helmetSettingsFromMetadata(metadata);

    expect(result.meta.find((m) => m.property === 'og:title')?.content).toBe('OG Title');
    expect(result.meta.find((m) => m.property === 'og:description')?.content).toBe('OG Description');
    expect(result.meta.find((m) => m.property === 'og:url')?.content).toBe('https://example.com/page');
    expect(result.meta.find((m) => m.property === 'og:image')?.content).toBe('https://example.com/image.png');
    expect(result.meta.find((m) => m.property === 'og:type')?.content).toBe('article');
  });

  it('generates Twitter meta tags', () => {
    const metadata = {
      title: 'Test Title',
      description: 'Test description',
      twitter: {
        title: 'Twitter Title',
        description: 'Twitter Description',
        imageUrl: 'https://example.com/twitter-image.png',
        cardType: 'summary_large_image',
        username: 'testuser',
      },
      og: {},
    };

    const result = helmetSettingsFromMetadata(metadata);

    expect(result.meta.find((m) => m.property === 'twitter:title')?.content).toBe('Twitter Title');
    expect(result.meta.find((m) => m.property === 'twitter:description')?.content).toBe('Twitter Description');
    expect(result.meta.find((m) => m.property === 'twitter:image')?.content).toBe(
      'https://example.com/twitter-image.png',
    );
    expect(result.meta.find((m) => m.property === 'twitter:card')?.content).toBe('summary_large_image');
    expect(result.meta.find((m) => m.property === 'twitter:site')?.content).toBe('@testuser');
  });

  it('falls back og:title to title when not specified', () => {
    const metadata = {
      title: 'Fallback Title',
      description: 'Test description',
      og: {},
    };

    const result = helmetSettingsFromMetadata(metadata);

    expect(result.meta.find((m) => m.property === 'og:title')?.content).toBe('Fallback Title');
  });

  it('filters out meta tags with empty content', () => {
    const metadata = {
      title: 'Test',
      description: 'Test description',
      og: {
        title: 'OG Title',
        imageUrl: undefined,
      },
    };

    const result = helmetSettingsFromMetadata(metadata);

    const ogImage = result.meta.find((m) => m.property === 'og:image');
    expect(ogImage).toBeUndefined();
  });

  it('removes extra spaces from description', () => {
    const metadata = {
      title: 'Test',
      description: 'This   has    extra   spaces',
    };

    const result = helmetSettingsFromMetadata(metadata);

    const descriptionMeta = result.meta.find((m) => m.name === 'description');
    expect(descriptionMeta.content).not.toMatch(/\s{2,}/);
  });

  it('skips title when setTitle option is false', () => {
    const metadata = {
      title: 'Should Not Appear',
    };

    const result = helmetSettingsFromMetadata(metadata, { setTitle: false });

    expect(result.title).toBeUndefined();
  });
});

describe('constructPageMetadata', () => {
  const mockRouter = { asPath: '/test-page' };
  const mockHomepage = 'https://example.com';

  it('constructs canonical URL from router path', () => {
    const defaultMetadata = {};
    const pageMetadata = {};

    const result = constructPageMetadata(defaultMetadata, pageMetadata, {
      router: mockRouter,
      homepage: mockHomepage,
    });

    expect(result.canonical).toBe('https://example.com/test-page');
  });

  it('uses explicit canonical when provided', () => {
    const defaultMetadata = {};
    const pageMetadata = {
      canonical: 'https://example.com/custom-canonical',
    };

    const result = constructPageMetadata(defaultMetadata, pageMetadata, {
      router: mockRouter,
      homepage: mockHomepage,
    });

    expect(result.canonical).toBe('https://example.com/custom-canonical');
  });

  it('merges page metadata over defaults', () => {
    const defaultMetadata = {
      title: 'Default Title',
      description: 'Default description',
    };
    const pageMetadata = {
      title: 'Page Title',
    };

    const result = constructPageMetadata(defaultMetadata, pageMetadata, {
      router: mockRouter,
      homepage: mockHomepage,
    });

    expect(result.title).toBe('Page Title');
    expect(result.description).toBe('Default description');
  });

  it('constructs og:url from full path', () => {
    const defaultMetadata = {};
    const pageMetadata = {};

    const result = constructPageMetadata(defaultMetadata, pageMetadata, {
      router: { asPath: '/page?query=1' },
      homepage: mockHomepage,
    });

    expect(result.og.url).toBe('https://example.com/page?query=1');
  });

  it('merges Open Graph properties', () => {
    const defaultMetadata = {
      og: {
        type: 'website',
      },
    };
    const pageMetadata = {
      og: {
        title: 'OG Page Title',
        description: 'OG Page Description',
      },
    };

    const result = constructPageMetadata(defaultMetadata, pageMetadata, {
      router: mockRouter,
      homepage: mockHomepage,
    });

    expect(result.og.title).toBe('OG Page Title');
    expect(result.og.description).toBe('OG Page Description');
    expect(result.og.type).toBe('website');
  });

  it('merges Twitter properties from og fallbacks', () => {
    const defaultMetadata = {};
    const pageMetadata = {
      og: {
        title: 'OG Title',
        description: 'OG Description',
      },
      twitter: {},
    };

    const result = constructPageMetadata(defaultMetadata, pageMetadata, {
      router: mockRouter,
      homepage: mockHomepage,
    });

    expect(result.twitter.title).toBe('OG Title');
    expect(result.twitter.description).toBe('OG Description');
  });

  it('handles article metadata for article type', () => {
    const defaultMetadata = {};
    const pageMetadata = {
      og: {
        type: 'article',
      },
      article: {
        author: 'Test Author',
        publishedTime: '2024-01-01T00:00:00Z',
        modifiedTime: '2024-01-02T00:00:00Z',
      },
    };

    const result = constructPageMetadata(defaultMetadata, pageMetadata, {
      router: mockRouter,
      homepage: mockHomepage,
    });

    expect(result.article.author).toBe('Test Author');
    expect(result.article.publishedTime).toBe('2024-01-01T00:00:00Z');
    expect(result.article.modifiedTime).toBe('2024-01-02T00:00:00Z');
  });
});
