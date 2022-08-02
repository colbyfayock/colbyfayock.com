import Link from 'next/link';

import { getTalkByUriSlug } from 'lib/talks';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import Content from 'components/Content';
import FeaturedImage from 'components/FeaturedImage';

import styles from 'styles/pages/Post.module.scss';

export default function Post({ talk }) {
  const { featuredImage, content, title, parent, children } = talk;

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
        {parent && (
          <p>
            <Link href={parent.uri}>
              <a>{parent.title}</a>
            </Link>
          </p>
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

      {children && (
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
      )}
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
