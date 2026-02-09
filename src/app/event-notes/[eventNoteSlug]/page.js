import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getEventNoteBySlug } from 'lib/event-notes';
import { getSiteMetadata } from 'lib/site';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import Content from 'components/Content';
import FeaturedImage from 'components/FeaturedImage';
import PdfSlider from 'components/PdfSlider';
import Video from 'components/Video';
import TwitterShareButton from './TwitterShareButton';

import styles from 'styles/pages/EventNotes.module.scss';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { eventNote } = await getEventNoteBySlug(resolvedParams.eventNoteSlug);

  if (!eventNote) {
    return {
      title: 'Event Note Not Found',
    };
  }

  const eventDescription = `Notes and resources from ${eventNote.title}`;

  return {
    title: eventNote.title,
    description: eventDescription,
    openGraph: {
      title: eventNote.title,
      description: eventDescription,
      url: `/event-notes/${resolvedParams.eventNoteSlug}`,
    },
    twitter: {
      title: eventNote.title,
      description: eventDescription,
    },
    alternates: {
      canonical: `/event-notes/${resolvedParams.eventNoteSlug}`,
    },
  };
}

export default async function EventNotePage({ params }) {
  const resolvedParams = await params;
  const { eventNote } = await getEventNoteBySlug(resolvedParams.eventNoteSlug);
  const metadata = await getSiteMetadata();

  if (!eventNote) {
    notFound();
  }

  const { featuredImage, content, title, eventType, eventSlides, mediaEmbed, talk } = eventNote;

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
        {eventType === 'conference' && <p className={styles.welcome}>Thanks for tuning in to my talk!</p>}
        {eventType === 'private' && <p className={styles.welcome}>Thanks for having me!</p>}
      </Header>

      <Content>
        <Section>
          <Container className={styles.eventNotesContainer}>
            <aside className={styles.sidebar}>
              {talk && (
                <>
                  <h2>Talk</h2>

                  <p>{talk.title}</p>
                </>
              )}

              {eventSlides?.mediaItemUrl && (
                <>
                  <h2>Slides</h2>

                  <PdfSlider width="1500" height="844" src={eventSlides.mediaItemUrl} />
                </>
              )}

              {eventType !== 'private' && (
                <>
                  <h2>Share the Notes</h2>

                  <p>Let people know you found this talk useful.</p>

                  <p className={styles.share}>
                    <TwitterShareButton eventNote={eventNote} />
                  </p>
                </>
              )}

              <h2>Get social!</h2>

              <ul className={styles.social}>
                <li>
                  <a href="https://twitter.com/colbyfayock">Follow me on Twitter</a>
                </li>
                <li>
                  <a href="https://www.youtube.com/colbyfayock?sub_confirmation=1">Subscribe to my YouTube</a>
                </li>
                <li>
                  <a href="https://www.twitch.tv/colbyfayock">Follow me on Twitch</a>
                </li>
                <li>
                  <Link href="/newsletter">Get updates with my Newsletter</Link>
                </li>
              </ul>
            </aside>

            <div className={styles.resources}>
              {mediaEmbed && (
                <>
                  <h2>Watch the Replay</h2>

                  <Video url={mediaEmbed} title={`Video for ${title}`} />
                </>
              )}

              <h2>Resources</h2>
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              />
            </div>
          </Container>
        </Section>
      </Content>
    </Layout>
  );
}
