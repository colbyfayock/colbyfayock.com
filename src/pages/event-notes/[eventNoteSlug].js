import Link from 'next/link';
import { Helmet } from 'react-helmet';

import { getEventNoteBySlug } from 'lib/event-notes';
import { createTweetAction, openTweet } from 'lib/social';
import { helmetSettingsFromMetadata } from 'lib/site';
import usePageMetadata from 'hooks/use-page-metadata';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import Content from 'components/Content';
import FeaturedImage from 'components/FeaturedImage';
import PdfSlider from 'components/PdfSlider';
import Button from 'components/Button';

import styles from 'styles/pages/EventNotes.module.scss';

export default function EventNote({ eventNote }) {
  const { featuredImage, content, title, eventType, eventSlides, talk } = eventNote;

  const { metadata } = usePageMetadata({
    metadata: {
      ...eventNote,
      title,
      description: `Notes and resources from ${title}`,
    },
  });

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  const twitterAction = createTweetAction({
    message: talk?.title
      ? [
          "Just checked out @colbyfayock's talk:",
          '',
          talk.title,
          '',
          'Slides and resources below 👇',
          '',
          metadata.canonical,
        ]
      : [`Just checked out @colbyfayock's at ${title}`, '', 'Slides and resources below 👇', '', metadata.canonical],
  });

  function handleOnTwitterClick(e) {
    e.preventDefault();
    openTweet({
      message: twitterAction,
    });
  }

  return (
    <Layout>
      <Helmet {...helmetSettings} />

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
        {eventType === 'conference' && <p className={styles.welcome}>Thanks for tuning in to my talk! ❤️</p>}
        {eventType === 'private' && <p className={styles.welcome}>Thanks for having me! 🚀</p>}
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
                    <Button onClick={handleOnTwitterClick}>Share a Tweet</Button>
                  </p>
                </>
              )}

              <h2>Get social!</h2>

              <ul className={styles.social}>
                <li>
                  <a href="https://twitter.com/colbyfayock">🐦 Follow me on Twitter</a>
                </li>
                <li>
                  <a href="https://www.youtube.com/colbyfayock?sub_confirmation=1">📺 Subscribe to my YouTube</a>
                </li>
                <li>
                  <a href="https://www.twitch.tv/colbyfayock">📹 Follow me on Twitch</a>
                </li>
                <li>
                  <Link href="/newsletter">
                    <a>✉️ Get updates with my Newsletter</a>
                  </Link>
                </li>
              </ul>
            </aside>

            <div className={styles.resources}>
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

export async function getStaticProps({ params = {} } = {}) {
  const { eventNote } = await getEventNoteBySlug(params?.eventNoteSlug);

  if (!eventNote) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      eventNote,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
