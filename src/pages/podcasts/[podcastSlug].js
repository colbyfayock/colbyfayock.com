import { getPodcastBySlug, getAllPodcasts } from 'lib/podcasts';
import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import Content from 'components/Content';
import FeaturedImage from 'components/FeaturedImage';

import styles from 'styles/pages/Post.module.scss';

export default function Post({ podcast }) {
  const { featuredImage, content, title, datePublished } = podcast;

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
        <p>{datePublished}</p>
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
  const { podcast } = await getPodcastBySlug(params?.podcastSlug);
  return {
    props: {
      podcast,
    },
  };
}

export async function getStaticPaths() {
  const { podcasts } = await getAllPodcasts();

  const paths = podcasts.map(({ slug }) => {
    return {
      params: {
        podcastSlug: slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
