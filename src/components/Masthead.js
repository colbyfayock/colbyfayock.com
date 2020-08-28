import React from 'react';

import { useSiteMetadata } from 'hooks';

import Logo from 'components/Logo';
import SocialIcons from 'components/SocialIcons';
import CosmoWave from 'components/CosmoWave';

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
        <CosmoWave />
      </div>
    </div>
  )
}

export default Masthead;