import React from 'react';

import Logo from 'components/Logo';
import SocialIcons from 'components/SocialIcons';

import { useSiteMetadata } from 'hooks';

const Masthead = () => {
  const { title, tagline, description, siteUrl } = useSiteMetadata();

  return (
    <div className="masthead">
      <div className="container">
        <h1><Logo /></h1>
        <p className="masthead-tagline">
          { tagline }
        </p>
        <SocialIcons />
      </div>
    </div>
  )
}

export default Masthead;