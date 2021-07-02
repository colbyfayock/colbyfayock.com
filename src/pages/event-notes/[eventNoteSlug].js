import { getEventNoteBySlug, getAllEventNotes } from 'lib/event-notes';
import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import Content from 'components/Content';
import FeaturedImage from 'components/FeaturedImage';

import styles from 'styles/pages/Post.module.scss';

export default function Post({ eventNote }) {
  const { featuredImage, content, title } = eventNote;

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
          </Container>
        </Section>
      </Content>
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { eventNote } = await getEventNoteBySlug(params?.eventNoteSlug);
  return {
    props: {
      eventNote,
    },
  };
}

export async function getStaticPaths() {
  const { eventNotes } = await getAllEventNotes();

  const paths = eventNotes.map(({ slug }) => {
    return {
      params: {
        eventNoteSlug: slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
