import config from '../../package.json';

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
