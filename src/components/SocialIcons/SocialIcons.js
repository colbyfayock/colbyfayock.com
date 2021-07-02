import { FaTwitter, FaDribbble, FaGithub, FaInstagram, FaYoutube, FaTwitch } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

import styles from './SocialIcons.module.scss';

const socialLinks = [
  {
    id: 'twitter',
    title: 'Twitter',
    url: 'http://twitter.com/colbyfayock',
    Icon: FaTwitter,
  },
  {
    id: 'youtube',
    title: 'Youtube',
    url: 'https://youtube.com/colbyfayock',
    Icon: FaYoutube,
  },
  {
    id: 'twitch',
    title: 'Twitch',
    url: 'https://www.twitch.tv/colbyfayock',
    Icon: FaTwitch,
  },
  {
    id: 'github',
    title: 'GitHub',
    url: 'http://github.com/colbyfayock',
    Icon: FaGithub,
  },
  {
    id: 'dribbble',
    title: 'Dribbble',
    url: 'http://dribbble.com/colbyfayock',
    Icon: FaDribbble,
  },
  {
    id: 'instagram',
    title: 'Instagram',
    url: 'https://www.instagram.com/colbyfayock/',
    Icon: FaInstagram,
  },
  {
    id: 'email',
    title: 'Email',
    url: 'mailto:hello@colbyfayock.com',
    Icon: FiMail,
  },
];

const SocialIcons = ({ className }) => {
  let socialIconsClassName = styles.socialIcons;

  if (className) {
    socialIconsClassName = `${socialIconsClassName} ${className}`;
  }

  return (
    <ul className={socialIconsClassName}>
      {socialLinks.map(({ id, url, title, Icon }) => {
        return (
          <li key={id} className={`social-icons-${id}`}>
            <a href={url} rel="me">
              <Icon />
              <span className="sr-only">{title}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default SocialIcons;
