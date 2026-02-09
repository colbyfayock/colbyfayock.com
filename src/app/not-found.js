import Link from 'next/link';

import { getSiteMetadata } from 'lib/site';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';

import styles from 'styles/pages/404.module.scss';

export const metadata = {
  title: '404 | Page not found',
  robots: 'noindex, nofollow',
};

export default async function NotFound() {
  const siteMetadata = await getSiteMetadata();

  return (
    <Layout metadata={siteMetadata}>
      <Section>
        <Container className={styles.center}>
          <h1>Page Not Found</h1>
          <span>The page you were looking for could not be found.</span>
          <p>
            <Link href="/">Go back home</Link>
          </p>
        </Container>
      </Section>
    </Layout>
  );
}
