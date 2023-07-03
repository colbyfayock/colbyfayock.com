import Link from 'next/link';
import { FaTwitter, FaYoutube } from 'react-icons/fa';

import useSite from 'hooks/use-site';
import { createTweetAction, openTweet } from 'lib/social';

import SocialIcons from 'components/SocialIcons';

import Section from 'components/Section';
import Container from 'components/Container';
import FormSignupNewsletter from 'components/FormSignupNewsletter';

import styles from './Footer.module.scss';

const Footer = () => {
  const { metadata = {} } = useSite();
  const { title } = metadata;

  const twitterAction = createTweetAction({
    message: [`Hey @colbyfayock! What's good? 😎`],
  });

  function handleOnTwitterClick(e) {
    e.preventDefault();
    openTweet({
      message: twitterAction,
    });
  }

  return (
    <div className={styles.footer}>
      <Section>
        <Container className={styles.footerSecondary}>
          <p className={styles.emoji}>👨‍🚀 🚀</p>
          <p>Want more Javascript, UX, and other interesting things?</p>
          <ul>
            <li>
              <a href={twitterAction} onClick={handleOnTwitterClick}>
                <FaTwitter /> Follow & Say Hi
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/colbyfayock?sub_confirmation=1">
                <FaYoutube /> Subscribe
              </a>
            </li>
          </ul>
        </Container>
      </Section>

      <Section>
        <Container className={styles.footerEmailSignup}>
          <p>Get free content and updates straight to your inbox!</p>
          <p className={styles.emoji}>🙌 ✉️ 🙌</p>
          <FormSignupNewsletter className={styles.footerEmailSignupForm} />
        </Container>
      </Section>

      <footer>
        <Section>
          <Container className={styles.footerPrimary} role="contentinfo">
            <SocialIcons className={styles.footerSocial} />

            <ul className={styles.footerLinks}>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/posts">All Posts</Link>
              </li>
              <li>
                <a href="/assets/colby-fayock-front-end-development-web-design-resume.pdf">Resume</a>
              </li>
              <li>
                <Link href="/">&copy; {title}</Link>
              </li>
            </ul>
          </Container>
        </Section>
      </footer>

      <div hidden className="h-card sr-only">
        <a className="p-name u-url" href="https://www.colbyfayock.com" rel="me">
          Colby Fayock
        </a>
        <img className="u-photo" src="https://www.colbyfayock.com/colby-fayock-bite-world.jpg" alt="Colby Fayock" />
        <p className="p-note">
          A Front End Engineer and UX Designer that’s passionate about tackling challenges that can help save people’s
          lives and make the world a better place.
        </p>
      </div>
    </div>
  );
};

export default Footer;
