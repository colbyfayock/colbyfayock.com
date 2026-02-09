import { notFound } from 'next/navigation';

import { getPodcastBySlug } from 'lib/podcasts';
import { getSiteMetadata } from 'lib/site';
import { processContentWithEmbeds } from 'lib/util';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import Content from 'components/Content';
import FeaturedImage from 'components/FeaturedImage';

import styles from 'styles/pages/Post.module.scss';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { podcast } = await getPodcastBySlug(resolvedParams.podcastSlug);

  if (!podcast) {
    return {
      title: 'Podcast Not Found',
    };
  }

  const podcastDescription = `Listen to ${podcast.title}`;

  return {
    title: podcast.title,
    description: podcastDescription,
    openGraph: {
      title: podcast.title,
      description: podcastDescription,
      url: `/podcasts/${resolvedParams.podcastSlug}`,
    },
    twitter: {
      title: podcast.title,
      description: podcastDescription,
    },
    alternates: {
      canonical: `/podcasts/${resolvedParams.podcastSlug}`,
    },
  };
}

export default async function PodcastPage({ params }) {
  const resolvedParams = await params;
  const { podcast } = await getPodcastBySlug(resolvedParams.podcastSlug);
  const metadata = await getSiteMetadata();

  if (!podcast) {
    notFound();
  }

  const { featuredImage, content, title, datePublished } = podcast;

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
