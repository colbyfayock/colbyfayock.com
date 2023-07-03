import Link from 'next/link';

import { getTalkByUriSlug } from 'lib/talks';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import Content from 'components/Content';
import FeaturedImage from 'components/FeaturedImage';

import styles from 'styles/pages/Talk.module.scss';

export default function Post({ talk }) {
  const { featuredImage, content, title, events } = talk;

  const hasEvents = Array.isArray(events) && events.length > 0;

  console.log('talk', talk);

  return (
    <Layout>
      <Header>
        {featuredImage && (
          <FeaturedImage
            {...featuredImage}
            src={featuredImage.sourceUrl}
            dangerouslySetInnerHTML={featuredImage.caption}
          />
        )}
        <h1
          className={styles.title}
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />
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
            <h2>Where I&apos;ve given this talk...</h2>

            {hasEvents && (
              <ul className={styles.events}>
                {events.map((event) => {
                  return (
                    <li key={event.id} className={styles.event}>
                      <h3 className={styles.eventTitle}>
                        <Link href={event.uri}>{event.title}</Link>
                      </h3>
                      <Link href={event.uri}>View Slides &amp; Talk Resources</Link>
                    </li>
                  );
                })}
              </ul>
            )}

            {!hasEvents && (
              <p>
                Haven&apos;t given it yet! Want to hear it? Hit me up on Twitter or email me at{' '}
                <a href="mailto:hello@colbyfayock.com">hello@colbyfayock.com</a>
              </p>
            )}
          </Container>
        </Section>
      </Content>
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { talk } = await getTalkByUriSlug(params?.talkSlug.join('/'));

  if (!talk) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      talk,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
