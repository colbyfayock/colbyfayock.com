import useSite from 'hooks/use-site';

import Container from 'components/Container';
import Logo from 'components/Logo';
import SocialIcons from 'components/SocialIcons';
import CosmoWave from 'components/CosmoWave';

import styles from './Masthead.module.scss';

const Masthead = () => {
  const { metadata = {} } = useSite();
  const { description } = metadata;

  return (
    <div className={styles.masthead}>
      <Container className={styles.mastheadContainer}>
        <h1>
          <Logo className={styles.mastheadLogo} />
        </h1>
        <p
          className={styles.mastheadTagline}
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
        <SocialIcons className={styles.mastheadSocialIcons} />
        <CosmoWave className={styles.mastheadCosmo} />
      </Container>
    </div>
  );
};

export default Masthead;
