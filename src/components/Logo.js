import React from 'react';

import { useSiteMetadata } from 'hooks';

const Logo = () => {
  const { title } = useSiteMetadata();

  return (
    <span className="logo">
      { title }
    </span>
  );
}

export default Logo;