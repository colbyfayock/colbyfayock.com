import { getSiteMetadata } from 'lib/site';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Content from 'components/Content';
import Section from 'components/Section';
import Container from 'components/Container';

import pageStyles from 'styles/pages/Page.module.scss';
import newsletterStyles from 'styles/pages/Newsletter.module.scss';

export const metadata = {
  robots: 'noindex, follow',
};

export default async function CourseConfirmPage() {
  const metadata = await getSiteMetadata();

  const styles = {
    ...pageStyles,
    ...newsletterStyles,
  };

  return (
    <Layout pageClassName={styles.pageNewsletter} metadata={metadata}>
      <Header>
        <h1 className={styles.title}>One more thing!</h1>
      </Header>

      <Content>
        <Section className={styles.newsletterContentSection}>
          <Container className={styles.newsletterContentContainer}>
            <div className={styles.content}>
              <p className={styles.contentCenter}>
                Check your inbox and <strong>click confirm</strong> to make sure you get updates.
              </p>
            </div>
          </Container>
        </Section>
      </Content>
    </Layout>
  );
}
