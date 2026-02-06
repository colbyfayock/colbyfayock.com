import { fetchAPI } from './wordpress';

export async function getSiteMetadata() {
  const query = `
    query SiteMetadata {
      generalSettings {
        title
        description
        language
      }
    }
  `;

  try {
    const data = await fetchAPI(query);
    const { generalSettings } = data || {};
    let { title, description, language } = generalSettings || {};

    const settings = {
      title,
      siteTitle: title,
      description,
      url: process.env.WORDPRESS_SITE_URL || process.env.NEXT_PUBLIC_HOME_URL || 'https://colbyfayock.com',
    };

    if (!language || language === '') {
      settings.language = 'en';
    } else {
      settings.language = language.split('_')[0];
    }

    settings.title = title;

    return settings;
  } catch (e) {
    console.log(`[site][getSiteMetadata] Failed to query site data: ${e.message}`);
    // Return default metadata if API fails
    return {
      title: 'Colby Fayock',
      siteTitle: 'Colby Fayock',
      description: "Colby Fayock's website",
      url: process.env.NEXT_PUBLIC_HOME_URL || 'https://colbyfayock.com',
      language: 'en',
    };
  }
}

export function decodeHtmlEntities(text) {
  if (!text) return text;
  return text.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, (match) => {
    switch (match) {
      case '&amp;':
        return '&';
      case '&lt;':
        return '<';
      case '&gt;':
        return '>';
      case '&quot;':
        return '"';
      case '&#039;':
        return "'";
      default:
        return match;
    }
  });
}

export function removeExtraSpaces(text) {
  if (!text) return text;
  return text.replace(/\s+/g, ' ').trim();
}

export function constructPageMetadata(defaultMetadata = {}, pageMetadata = {}, options = {}) {
  const { router = {}, homepage = '' } = options;
  const { asPath } = router;

  const url = `${homepage}${asPath}`;
  const pathname = new URL(url).pathname;
  const canonical = pageMetadata.canonical || `${homepage}${pathname}`;

  const metadata = {
    canonical,
    og: {
      url,
    },
    twitter: {},
  };

  const staticProperties = ['description', 'language', 'title'];

  staticProperties.forEach((property) => {
    const value = typeof pageMetadata[property] !== 'undefined' ? pageMetadata[property] : defaultMetadata[property];

    if (typeof value === 'undefined') return;

    metadata[property] = value;
  });

  if (pageMetadata.og) {
    const ogProperties = ['description', 'imageUrl', 'imageHeight', 'imageSecureUrl', 'imageWidth', 'title', 'type'];

    ogProperties.forEach((property) => {
      const pageOg = pageMetadata.og?.[property];
      const pageStatic = pageMetadata[property];
      const defaultOg = defaultMetadata.og?.[property];
      const defaultStatic = defaultMetadata[property];
      const value = pageOg || pageStatic || defaultOg || defaultStatic;

      if (typeof value === 'undefined') return;

      metadata.og[property] = value;
    });
  }

  if (pageMetadata.twitter) {
    const twitterProperties = ['cardType', 'description', 'imageUrl', 'title', 'username'];

    twitterProperties.forEach((property) => {
      const pageTwitter = pageMetadata.twitter?.[property];
      const pageOg = metadata.og[property];
      const value = pageTwitter || pageOg;

      if (typeof value === 'undefined') return;

      metadata.twitter[property] = value;
    });
  }

  if (metadata.og.type === 'article' && pageMetadata.article) {
    metadata.article = {};

    const articleProperties = ['author', 'modifiedTime', 'publishedTime', 'publisher'];

    articleProperties.forEach((property) => {
      const value = pageMetadata.article[property];

      if (typeof value === 'undefined') return;

      metadata.article[property] = value;
    });
  }

  return metadata;
}
