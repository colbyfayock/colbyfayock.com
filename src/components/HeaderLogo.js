import React from 'react';
import { Link } from 'gatsby';

const name = 'Colby Fayock';

const HeaderLogo = ({path}) => {
  const isHome = path === '/';
  return (
    <div className="header-logo">
      { isHome && (
        <h1 className="h1">
          <Link to="/">{ name }</Link>
          <span className="tagline">
            A UX Designer &amp; Front End Engineer Blog
          </span>
        </h1>
      )}
      { !isHome && (
        <span className="h1">
          <Link to="/">{ name }</Link>
        </span>
      )}
    </div>
  );
}

export default HeaderLogo;