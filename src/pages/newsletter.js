import Link from 'next/link';
import { Helmet } from 'react-helmet';

import { getPageByUri } from 'lib/pages';
import { WebpageJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Content from 'components/Content';
import Section from 'components/Section';
import Container from 'components/Container';
import FeaturedImage from 'components/FeaturedImage';
import FormSignupNewsletter from 'components/FormSignupNewsletter';

import styles from 'styles/pages/Page.module.scss';

const NEWSLETTER_PAGE_URI = '/newsletter/';

export default function Page({ page }) {
  const { title, metaTitle, description, slug, content, featuredImage, children } = page;

  const { metadata: siteMetadata = {} } = useSite();

  const { metadata } = usePageMetadata({
    metadata: {
      ...page,
      title: metaTitle,
      description: description || page.og?.description || `Read more about ${title}`,
    },
  });

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = `${title} - ${siteMetadata.title}`;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
  }

  const hasChildren = Array.isArray(children) && children.length > 0;

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  return (
    <Layout>
      <Helmet {...helmetSettings} />

      <WebpageJsonLd
        title={metadata.title}
        description={metadata.description}
        siteTitle={siteMetadata.title}
        slug={slug}
      />

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
                        <Link href={child.uri}>
                          <a>{child.title}</a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </aside>
            </Container>
          </Section>
        )}

        <Section>
          <Container>
            <FormSignupNewsletter />
          </Container>
        </Section>
      </Content>
    </Layout>
  );
}

export async function getStaticProps() {
  const { page } = await getPageByUri(NEWSLETTER_PAGE_URI);

  return {
    props: {
      page,
    },
  };
}
