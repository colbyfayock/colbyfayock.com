import { Helmet } from 'react-helmet';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Content from 'components/Content';
import Section from 'components/Section';
import Container from 'components/Container';

import pageStyles from 'styles/pages/Page.module.scss';
import newsletterStyles from 'styles/pages/Newsletter.module.scss';

export default function Page() {
  const styles = {
    ...pageStyles,
    ...newsletterStyles,
  };

  return (
    <Layout pageClassName={styles.pageNewsletter}>
      <Helmet>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

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
