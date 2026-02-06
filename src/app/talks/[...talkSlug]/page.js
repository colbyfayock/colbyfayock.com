import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getTalkByUriSlug } from 'lib/wordpress';
import { getSiteMetadata } from 'lib/site';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import Content from 'components/Content';
import FeaturedImage from 'components/FeaturedImage';

import styles from 'styles/pages/Talk.module.scss';

export const revalidate = 60;
export const dynamicParams = true;

// Skip static generation to avoid API rate limits during build
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  const metadata = await getSiteMetadata();
  const resolvedParams = await params;
  const { talkSlug } = resolvedParams;

  if (!talkSlug || talkSlug.length === 0) {
    return {
      title: 'Talk Not Found',
    };
  }

  const { talk } = await getTalkByUriSlug(talkSlug.join('/'));

  if (!talk) {
    return {
      title: 'Talk Not Found',
    };
  }

  return {
    title: talk.title,
    description: `Watch and learn from the talk: ${talk.title}`,
    openGraph: {
      url: `${metadata.url}/talks/${talkSlug.join('/')}`,
    },
    alternates: {
      canonical: `/talks/${talkSlug.join('/')}`,
    },
  };
}

export default async function TalkPage({ params }) {
  const resolvedParams = await params;
  const { talkSlug } = resolvedParams;
  const { talk } = await getTalkByUriSlug(talkSlug.join('/'));
  const metadata = await getSiteMetadata();

  if (!talk) {
    notFound();
  }

  const { featuredImage, content, title, events } = talk;
  const hasEvents = Array.isArray(events) && events.length > 0;

  return (
    <Layout metadata={metadata}>
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
