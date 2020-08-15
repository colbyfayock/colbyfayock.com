import React from 'react';
import {
  FaTwitter,
  FaDribbble,
  FaGithub,
  FaInstagram,
  FaYoutube,
  FaRss
} from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

import LogoEgghead from 'components/LogoEgghead';
import LogoRedbubble from 'components/LogoRedbubble';

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
    id: 'eggheadio',
    title: 'Egghead.io',
    url: 'https://egghead.io/instructors/colby-fayock?af=atzgap',
    Icon: LogoEgghead,
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
    id: 'redbubble',
    title: 'Redbubble',
    url: 'https://www.redbubble.com/people/colbyfayock/shop',
    Icon: LogoRedbubble,
  },
  {
    id: 'email',
    title: 'Email',
    url: 'mailto:hello@colbyfayock.com',
    Icon: FiMail,
  },
  {
    id: 'rss',
    title: 'RSS',
    url: 'https://www.colbyfayock.com/rss.xml',
    Icon: FaRss,
  },
];

const SocialIcons = () => {
  return (
    <ul className="social-icons">
      { socialLinks.map(({ id, url, title, Icon }) => {
        return (
          <li key={id} className={`social-icons-${id}`}>
            <a href={url} rel="me">
              <Icon />
              <span className="ir">{ title }</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default SocialIcons;