import config from '../../package.json';

export function ArticleJsonLd({ post = {}, siteTitle = '' }) {
  const homepage = config.homepage || '';
  const faviconPath = config.faviconPath || '/favicon.ico';
  const { title, slug, excerpt, date, author, categories, modified, featuredImage } = post;
  const path = `/posts/${slug}`;
  const datePublished = !!date && new Date(date);
  const dateModified = !!modified && new Date(modified);

  const fallbackImage = `${homepage}/images/og/default.png`;
  const image = featuredImage?.sourceUrl || fallbackImage;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${homepage}${path}`,
    },
    headline: title,
    image: [image],
    datePublished: datePublished ? datePublished.toISOString() : '',
    dateModified: dateModified ? dateModified.toISOString() : datePublished.toISOString(),
    description: excerpt,
    keywords: [categories?.map(({ name }) => `${name}`).join(', ') || ''],
    copyrightYear: datePublished ? datePublished.getFullYear() : '',
    author: {
      '@type': 'Person',
      name: author?.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteTitle,
      logo: {
        '@type': 'ImageObject',
        url: `${homepage}${faviconPath}`,
      },
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

export function WebsiteJsonLd({ siteTitle = '' }) {
  const homepage = config.homepage || '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteTitle,
    url: homepage,
    copyrightYear: new Date().getFullYear(),
    potentialAction: {
      '@type': 'SearchAction',
      target: `${homepage}/search/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

export function WebpageJsonLd({ title = '', description = '', siteTitle = '', slug = '' }) {
  const homepage = config.homepage || '';
  const path = slug ? `/${slug}` : '';

  const jsonLd = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: `${homepage}${path}`,
    publisher: {
      '@type': 'ProfilePage',
      name: siteTitle,
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

export function AuthorJsonLd({ author = {} }) {
  const homepage = config.homepage || '';
  const { name, avatar, description } = author;
  const path = `/author/${name?.toLowerCase().replace(/\s+/g, '-')}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: name,
    image: avatar?.url,
    url: `${homepage}${path}`,
    description: description,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

export function LogoJsonLd() {
  const homepage = config.homepage || '';
  const faviconPath = config.faviconPath || '/favicon.ico';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    url: `${homepage}`,
    logo: `${homepage}${faviconPath}`,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
