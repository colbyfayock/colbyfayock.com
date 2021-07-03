import Link from 'next/link';
import { FaRss } from 'react-icons/fa';

import useSite from 'hooks/use-site';
import { getAllPosts } from 'lib/posts';
import { getAllProjects } from 'lib/projects';
import { getAllFeaturedFeatures } from 'lib/featured-features';
import { WebsiteJsonLd } from 'lib/json-ld';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import PostCardList from 'components/PostCardList';
import Masthead from 'components/Masthead';
import Button from 'components/Button';

import styles from 'styles/pages/Home.module.scss';

export default function Home({ posts, projects, featuredFeatures }) {
  const { metadata = {} } = useSite();
  const { title } = metadata;

  return (
    <Layout exclude={['nav']}>
      <WebsiteJsonLd siteTitle={title} />

      <Masthead />

      <Section className={styles.homeNewsletter}>
        <Container>
          <Link href="/newsletter">
            <a>
              <span className={styles.homeNewsletterIcon}>📬</span>
              <div className={styles.homeNewsletterContent}>
                <h3>Weekly Newsletter</h3>
                <p>Fresh guides & tutorials weekly straight to your inbox!</p>
              </div>
              <div className={styles.homeNewsletterButton}>
                <Button>Sign Up</Button>
              </div>
            </a>
          </Link>
        </Container>
      </Section>

      <Section>
        <Container className={styles.homeContentContainer}>
          <div className={styles.homeMain}>
            <div className={styles.homeContentHeader}>
              <Link href="/posts">
                <a className={styles.homeContentHeaderTitle}>
                  <h2>
                    <span className={styles.headerContentHeaderIcon}>📝</span> Latest From the Blog
                  </h2>
                </a>
              </Link>
              <div className={styles.homeContentHeaderActions}>
                <a href="https://www.colbyfayock.com/rss.xml">
                  <FaRss /> RSS
                </a>
              </div>
            </div>

            <PostCardList posts={posts} labelPlural="Posts" url="/posts" />
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
                }}
              />
            </div>

            <div className={styles.homeSidebarSection}>
              <div className={styles.homeContentHeader}>
                <Link href="/projects">
                  <a className={styles.homeContentHeaderTitle}>
                    <h2>
                      <span className={styles.headerContentHeaderIcon}>💼</span> Featured Projects
                    </h2>
                  </a>
                </Link>
              </div>
              <PostCardList
                posts={projects}
                labelPlural="Projects"
                url="/projects"
                postCardOptions={{
                  contentField: 'content',
                  linkField: 'projectUrl',
                }}
              />
            </div>

            <div className={styles.homeSidebarSection}>
              <div className={styles.homeContentHeader}>
                <Link href="/talks">
                  <a className={styles.homeContentHeaderTitle}>
                    <h2>
                      <span className={styles.headerContentHeaderIcon}>📣</span> Recent Events
                    </h2>
                  </a>
                </Link>
              </div>
              <PostCardList
                posts={projects}
                labelPlural="Projects"
                url="/projects"
                postCardOptions={{
                  contentField: 'content',
                }}
              />
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}

export async function getStaticProps() {
  const { posts } = await getAllPosts();
  const { projects } = await getAllProjects();
  const { featuredFeatures } = await getAllFeaturedFeatures();
  console.log('featuredFeatures', featuredFeatures);

  return {
    props: {
      posts: posts.slice(0, 5),
      projects: projects.slice(0, 5),
      featuredFeatures,
    },
  };
}
