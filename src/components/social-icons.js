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

import EggheadLogo from 'components/EggheadLogo';
import RedbubbleLogo from 'components/RedbubbleLogo';

const SocialIconsList = ({links}) => {

  if ( !Array.isArray(links) ) return null;

  const link_items = links.map((item, index) => {
    const id = item.title.toLowerCase().replace('.', '');
    return (
      <li key={`SocialIconsList-${index}`} className={`social-icons-${id}`}>
        <a href={item.url} rel="me">
          { item.icon }
          <span className="ir">{ item.title }</span>
        </a>
      </li>
    );
  });

  return (
    <div>
      { link_items }
    </div>
  )

}

const SocialIcons = () => {

  const social_links = [
    {
      title: 'Twitter',
      url: 'http://twitter.com/colbyfayock',
      icon: <FaTwitter />,
    },
    {
      title: 'Youtube',
      url: 'https://youtube.com/colbyfayock',
      icon: <FaYoutube />,
    },
    {
      title: 'Egghead.io',
      url: 'https://egghead.io/instructors/colby-fayock?af=atzgap',
      icon: <EggheadLogo />,
    },
    {
      title: 'GitHub',
      url: 'http://github.com/colbyfayock',
      icon: <FaGithub />,
    },
    {
      title: 'Dribbble',
      url: 'http://dribbble.com/colbyfayock',
      icon: <FaDribbble />,
    },
    {
      title: 'Instagram',
      url: 'https://www.instagram.com/colbyfayock/',
      icon: <FaInstagram />,
    },
    {
      title: 'Redbubble',
      url: 'https://www.redbubble.com/people/colbyfayock/shop',
      icon: <RedbubbleLogo />,
    },
    {
      title: 'Email',
      url: 'mailto:hello@colbyfayock.com',
      icon: <FiMail />,
    },
    {
      title: 'RSS',
      url: 'https://www.colbyfayock.com/rss.xml',
      icon: <FaRss />,
    },
  ];

  return (
    <ul className="social-icons">
      <SocialIconsList links={social_links} />
    </ul>
  );

}

export default SocialIcons;