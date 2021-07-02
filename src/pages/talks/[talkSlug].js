import { getTalkBySlug, getAllTalks } from 'lib/talks';
import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import Content from 'components/Content';
import FeaturedImage from 'components/FeaturedImage';

import styles from 'styles/pages/Post.module.scss';

export default function Post({ talk }) {
  const { featuredImage, content, title } = talk;

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
  const { talk } = await getTalkBySlug(params?.talkSlug);
  return {
    props: {
      talk,
    },
  };
}

export async function getStaticPaths() {
  const { talks } = await getAllTalks();

  const paths = talks.map(({ slug }) => {
    return {
      params: {
        talkSlug: slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
