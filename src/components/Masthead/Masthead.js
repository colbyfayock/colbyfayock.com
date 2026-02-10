import Container from 'components/Container';
import Logo from 'components/Logo';
import SocialIcons from 'components/SocialIcons';
import CosmoWave from 'components/CosmoWave';

import styles from './Masthead.module.scss';

const Masthead = ({ metadata }) => {
  const { description, title } = metadata || {};

  return (
    <div className={styles.masthead}>
      <Container className={styles.mastheadContainer}>
        <h1>
          <Logo className={styles.mastheadLogo} title={title} />
        </h1>
        {description && (
          <p
            className={styles.mastheadTagline}
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        )}
        <SocialIcons className={styles.mastheadSocialIcons} />
        <CosmoWave className={styles.mastheadCosmo} />
      </Container>
    </div>
  );
};

export default Masthead;
