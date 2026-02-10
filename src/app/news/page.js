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

const NEWSLETTER_PAGE_URI = '/newsletter/';

export async function generateMetadata() {
  const { page } = await getPageByUri(NEWSLETTER_PAGE_URI);

  if (!page) {
    return {
      title: 'Newsletter Not Found',
      robots: 'noindex, follow',
    };
  }

  const { title, metaTitle, description } = page;

  return {
    title: metaTitle || title,
    description: description,
    robots: 'noindex, follow',
  };
}

export default async function NewsPage() {
  const { page } = await getPageByUri(NEWSLETTER_PAGE_URI);
  const siteMetadata = await getSiteMetadata();

  if (!page) {
    notFound();
  }

  const { title, content, featuredImage } = page;

  const styles = {
    ...pageStyles,
    ...newsletterStyles,
  };

  return (
    <Layout pageClassName={styles.pageNewsletter} metadata={siteMetadata}>
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
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </Container>
        </Section>

        <Section className={styles.newsletterFormSection}>
          <Container>
            <FormSignupNewsletter className={styles.newsletterForm} location="newsletter" />
          </Container>
        </Section>
      </Content>
    </Layout>
  );
}
