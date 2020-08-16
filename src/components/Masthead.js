import React from 'react';

import { useSiteMetadata } from 'hooks';

import Logo from 'components/Logo';
import SocialIcons from 'components/SocialIcons';

import imgCosmo from 'assets/images/cosmo.png';

const Masthead = () => {
  const { tagline } = useSiteMetadata();

  return (
    <div className="masthead">
      <div className="container">
        <h1>
          <Logo />
        </h1>
        <p className="masthead-tagline">
          { tagline }
        </p>
        <SocialIcons />
        <img src={imgCosmo} />
      </div>
    </div>
  )
}

export default Masthead;