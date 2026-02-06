import { notFound } from 'next/navigation';

import { getPageByUri } from 'lib/pages';
import { getSiteMetadata } from 'lib/site';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Content from 'components/Content';
import Section from 'components/Section';
import Container from 'components/Container';
import FeaturedImage from 'components/FeaturedImage';
import FormSignupNewsletter from 'components/FormSignupNewsletter';

import pageStyles from 'styles/pages/Page.module.scss';
import newsletterStyles from 'styles/pages/Newsletter.module.scss';

export const revalidate = 60;

const PAGE_URI = '/course/';

export async function generateMetadata() {
  const { page } = await getPageByUri(PAGE_URI);
  const metadata = await getSiteMetadata();

  if (!page) {
    return {
      title: 'Course Not Found',
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

export default async function CoursePage() {
  const { page } = await getPageByUri(PAGE_URI);
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
    ...newsletterStyles,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Layout pageClassName={styles.pageNewsletter} metadata={metadata}>
        <Header>
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
          <Section className={styles.newsletterContentSection}>
            <Container className={styles.newsletterContentContainer}>
              <div
                className={styles.content}
                style={{
                  maxWidth: '50em',
                  margin: '0 auto',
                }}
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              />
            </Container>
          </Section>

          <Section className={`${styles.newsletterFormSection} ${styles.courseFormSection}`}>
            <Container>
              <FormSignupNewsletter className={styles.newsletterForm} location="course" />
            </Container>
          </Section>
        </Content>
      </Layout>
    </>
  );
}
