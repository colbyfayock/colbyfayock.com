import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getPageByUri, getAllPages, getBreadcrumbsByUri } from 'lib/wordpress';
import { getSiteMetadata } from 'lib/site';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Content from 'components/Content';
import Section from 'components/Section';
import Container from 'components/Container';
import FeaturedImage from 'components/FeaturedImage';
import Breadcrumbs from 'components/Breadcrumbs';

import styles from 'styles/pages/Page.module.scss';

export const revalidate = 60;
export const dynamicParams = true;

// Skip static generation to avoid API rate limits during build
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  const metadata = await getSiteMetadata();
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let pageUri = `/${slug.join('/')}/`;

  const { page } = await getPageByUri(pageUri);

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  const { title, metaTitle, description, slug: pageSlug } = page;

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
      url: `${metadata.url}${pageSlug}`,
    },
    alternates: {
      canonical: pageSlug,
    },
  };
}

export default async function DynamicPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let pageUri = `/${slug.join('/')}/`;

  const { page } = await getPageByUri(pageUri);

  if (!page) {
    notFound();
  }

  const metadata = await getSiteMetadata();
  const { pages } = await getAllPages();
  const breadcrumbs = getBreadcrumbsByUri(pageUri, pages);

  const { title, description, content, featuredImage, children } = page;

  const hasChildren = Array.isArray(children) && children.length > 0;
  const hasBreadcrumbs = Array.isArray(breadcrumbs) && breadcrumbs.length > 0;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: `${metadata.url}${page.uri}`,
    publisher: {
      '@type': 'ProfilePage',
      name: metadata.title,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Layout metadata={metadata}>
        <Header>
          {hasBreadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
          {featuredImage && (
            <FeaturedImage
              {...featuredImage}
              src={featuredImage.sourceUrl}
              dangerouslySetInnerHTML={featuredImage.caption}
            />
          )}
          <h1 className={styles.title}>{title}</h1>
        </Header>

        <Content>
          <Section>
            <Container>
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              />
            </Container>
          </Section>

          {hasChildren && (
            <Section className={styles.sectionChildren}>
              <Container>
                <aside>
                  <p className={styles.childrenHeader}>
                    <strong>{title}</strong>
                  </p>
                  <ul>
                    {children.map((child) => {
                      return (
                        <li key={child.id}>
                          <Link href={child.uri}>{child.title}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </aside>
              </Container>
            </Section>
          )}
        </Content>
      </Layout>
    </>
  );
}
