import { notFound } from 'next/navigation';

import { getPageByUri } from 'lib/pages';
import { getSiteMetadata } from 'lib/site';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Content from 'components/Content';
import Section from 'components/Section';
import Container from 'components/Container';
import FeaturedImage from 'components/FeaturedImage';

import pageStyles from 'styles/pages/Page.module.scss';
import usesStyles from 'styles/pages/Uses.module.scss';

export const revalidate = 3600;

const USES_PAGE_URI = '/uses/';

export async function generateMetadata() {
  const { page } = await getPageByUri(USES_PAGE_URI);
  const metadata = await getSiteMetadata();

  if (!page) {
    return {
      title: 'Uses Not Found',
    };
  }

  const { title, metaTitle, description, slug } = page;

  let pageTitle = metaTitle || title;
  let pageDescription = description;

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    pageTitle = `${title} - ${metadata.title}`;
    pageDescription = description || `Read more about ${title}`;
  }

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      url: `${metadata.url}${slug}`,
    },
    alternates: {
      canonical: slug,
    },
  };
}

export default async function UsesPage() {
  const { page } = await getPageByUri(USES_PAGE_URI);
  const metadata = await getSiteMetadata();

  if (!page) {
    notFound();
  }

  const { title, content, featuredImage, slug } = page;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: page.description,
    url: `${metadata.url}${slug}`,
    publisher: {
      '@type': 'ProfilePage',
      name: metadata.title,
    },
  };

  const styles = {
    ...pageStyles,
    ...usesStyles,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Layout pageClassName={styles.pageUses} metadata={metadata}>
        <Header className={styles.usesHeader} containerClassName={styles.usesHeaderContainer}>
          {featuredImage && (
            <FeaturedImage
              {...featuredImage}
              className={styles.usesFeaturedImage}
              src={featuredImage.sourceUrl}
              dangerouslySetInnerHTML={featuredImage.caption}
            />
          )}
          <h1 className={styles.title}>{title}</h1>
        </Header>

        <Content>
          <Section className={styles.usesContentSection}>
            <Container className={styles.usesContentContainer}>
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              />
            </Container>
          </Section>
        </Content>
      </Layout>
    </>
  );
}
