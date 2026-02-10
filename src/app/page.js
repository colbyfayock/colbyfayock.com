import Link from 'next/link';
import { FaRss } from 'react-icons/fa';

import { getAllPosts } from 'lib/posts';
import { getAllProjects } from 'lib/projects';
import { getAllFeaturedFeatures } from 'lib/featured-features';
import { getSiteMetadata } from 'lib/site';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import PostCardList from 'components/PostCardList';
import Masthead from 'components/Masthead';
import Button from 'components/Button';

import styles from 'styles/pages/Home.module.scss';

export const revalidate = 60;

export async function generateMetadata() {
  const metadata = await getSiteMetadata();

  return {
    title: {
      absolute: metadata.title, // Don't append site name to homepage
    },
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: '/',
    },
    twitter: {
      title: metadata.title,
      description: metadata.description,
    },
    alternates: {
      canonical: '/',
    },
  };
}

export default async function HomePage() {
  const { posts } = await getAllPosts();
  const { projects } = await getAllProjects();
  const { featuredFeatures } = await getAllFeaturedFeatures();
  const metadata = await getSiteMetadata();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: metadata.title,
    url: metadata.url,
    copyrightYear: new Date().getFullYear(),
    potentialAction: {
      '@type': 'SearchAction',
      target: `${metadata.url}/search/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Layout exclude={['nav']} metadata={metadata}>
        <Masthead metadata={metadata} />

        <Section className={styles.homeNewsletter}>
          <Container>
            <Link href="/newsletter">
              <span className={styles.homeNewsletterIcon}>📬</span>
              <div className={styles.homeNewsletterContent}>
                <h3>Weekly Newsletter</h3>
                <p>Fresh guides & tutorials weekly straight to your inbox!</p>
              </div>
              <div className={styles.homeNewsletterButton}>
                <Button>Sign Up</Button>
              </div>
            </Link>
          </Container>
        </Section>

        <Section>
          <Container className={styles.homeContentContainer}>
            <div className={styles.homeMain}>
              <div className={styles.homeContentHeader}>
                <Link href="/posts" className={styles.homeContentHeaderTitle}>
                  <h2>
                    <span className={styles.headerContentHeaderIcon}>📝</span> Latest From the Blog
                  </h2>
                </Link>
                <div className={styles.homeContentHeaderActions}>
                  <a href="https://www.colbyfayock.com/rss.xml">
                    <FaRss /> RSS
                  </a>
                </div>
              </div>

              <PostCardList posts={posts.slice(0, 5)} labelPlural="Posts" url="/posts" />
            </div>

            <div className={styles.homeSidebar}>
              <div className={styles.homeSidebarSection}>
                <div className={styles.homeContentHeader}>
                  <span className={styles.homeContentHeaderTitle}>
                    <h2>
                      <span className={styles.headerContentHeaderIcon}>✨</span> Featured Features
                    </h2>
                  </span>
                </div>
                <PostCardList
                  posts={featuredFeatures}
                  postCardOptions={{
                    contentField: 'content',
                    linkField: 'featureUrl',
                    hideMetadata: true,
                  }}
                />
              </div>

              <div className={styles.homeSidebarSection}>
                <div className={styles.homeContentHeader}>
                  <Link href="/projects" className={styles.homeContentHeaderTitle}>
                    <h2>
                      <span className={styles.headerContentHeaderIcon}>💼</span> Featured Projects
                    </h2>
                  </Link>
                </div>
                <PostCardList
                  posts={projects.slice(0, 5)}
                  labelPlural="Projects"
                  url="/projects"
                  postCardOptions={{
                    contentField: 'content',
                    linkField: 'projectUrl',
                    hideMetadata: true,
                  }}
                />
              </div>
            </div>
          </Container>
        </Section>
      </Layout>
    </>
  );
}
