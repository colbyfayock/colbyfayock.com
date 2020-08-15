import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import 'assets/scss/main.scss';

import { useSiteMetadata } from 'hooks';

import Header from 'components/Header';
import Footer from 'components/footer';

import websiteSocialCard from 'assets/images/website-social-card.jpg'
import imgFaviconPng from 'assets/images/favicon.png';
import imgTouchiconPng from 'assets/images/touchicon.png';

const TemplateWrapper = ({children, location}) => {

  const { title, tagline, description, siteUrl } = useSiteMetadata();

  const isHome = location.pathname === '/';

  const defaultTitle = `${title} - ${tagline}`;
  const socialImage = `${siteUrl}${websiteSocialCard}`;

  const helmet_settings = {
    defaultTitle,
    titleTemplate: `%s - ${title}`,
    meta: [
      {
        name: 'description',
        content: description
      },
      {
        name: 'image',
        content: socialImage
      },
      {
        property: 'og:title',
        content: defaultTitle,
      },
      {
        property: 'og:description',
        content: description,
      },
      {
        property: 'og:url',
        content: siteUrl,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:site_name',
        content: title,
      },
      {
        property: 'og:image',
        content: socialImage
      },
      {
        property: 'og:image:secure_url',
        content: socialImage
      },
      {
        property: 'og:image:width',
        content: 1280
      },
      {
        property: 'og:image:height',
        content: 640
      },
      {
        property: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        property: 'twitter:image',
        content: socialImage
      },
      {
        property: 'twitter:site',
        content: '@colbyfayock'
      },
      {
        property: 'twitter:creator',
        content: '@colbyfayock'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        href: imgFaviconPng,
      },
      {
        rel: 'apple-touch-icon-precomposed',
        type: 'image/png',
        href: imgTouchiconPng,
      },
    ],
  };

  return (
    <>
      <Helmet {...helmet_settings} />

      { !isHome && <Header location={location} /> }

      <div id="main" role="main">
        { children }
      </div>

      <Footer />
    </>
  );

}

TemplateWrapper.propTypes = {
  children: PropTypes.object,
  location: PropTypes.object,
}

export default TemplateWrapper;
