import { getAllEventNotes } from 'lib/wordpress';
import { getSiteMetadata } from 'lib/site';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import SectionTitle from 'components/SectionTitle';
import PostCard from 'components/PostCard';

import styles from 'styles/templates/Archive.module.scss';

export const revalidate = 900;

export async function generateMetadata() {
  const metadata = await getSiteMetadata();

  return {
    title: 'Event Notes',
    description: 'Conference talks and workshop notes',
    openGraph: {
      url: `${metadata.url}/event-notes`,
    },
    alternates: {
      canonical: '/event-notes',
    },
  };
}

export default async function EventNotesPage() {
  const { eventNotes } = await getAllEventNotes();
  const metadata = await getSiteMetadata();

  const title = 'Event Notes';
  const label = 'Notes';
  const slug = 'event-notes';

  const notes = eventNotes
    .filter((post) => post.eventType !== 'private')
    .map((post) => {
      return {
        ...post,
        excerpt: post.talk?.title,
      };
    });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: 'Conference talks and workshop notes',
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
            {Array.isArray(notes) && (
              <ul className={styles.posts}>
                {notes.map((post) => {
                  return (
                    <li key={post.slug}>
                      <PostCard post={post} parentSlug={slug} />
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
