import Link from 'next/link';

import { getAllTalks } from 'lib/talks';
import { getSiteMetadata } from 'lib/site';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import SectionTitle from 'components/SectionTitle';

import styles from 'styles/templates/Archive.module.scss';

export const revalidate = 900;

export async function generateMetadata() {
  const metadata = await getSiteMetadata();

  return {
    title: 'All Talks',
    description: `Talks and presentations by ${metadata.title}`,
    openGraph: {
      url: `${metadata.url}/talks`,
    },
    alternates: {
      canonical: '/talks',
    },
  };
}

export default async function TalksPage() {
  const { talks } = await getAllTalks();
  const metadata = await getSiteMetadata();

  const title = 'All Talks';
  const label = 'Talks';
  const slug = 'talks';

  // Sort by number of events (most popular first)
  const sortedTalks = [...talks].sort((a, b) => b.events.length - a.events.length);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: `Talks and presentations by ${metadata.title}`,
    url: `${metadata.url}/${slug}`,
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
          <Container>
            <h1>{title}</h1>
          </Container>
        </Header>

        <Section>
          <Container>
            <SectionTitle>{label}</SectionTitle>
            {Array.isArray(sortedTalks) && (
              <ul className={styles.posts}>
                {sortedTalks.map((talk) => {
                  return (
                    <li key={talk.slug}>
                      <div className={styles.postCard}>
                        <Link href={talk.uri}>
                          <h3
                            className={styles.postCardTitle}
                            dangerouslySetInnerHTML={{
                              __html: talk.title,
                            }}
                          />
                        </Link>
                        <p>{talk.events.length} Events</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </Container>
        </Section>
      </Layout>
    </>
  );
}
