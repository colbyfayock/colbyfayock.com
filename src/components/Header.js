import React from 'react';
import { Link } from 'gatsby';

import Logo from './Logo';
import SocialIcons from 'components/SocialIcons';

const Header = ({location}) => {
  return (
    <nav className="header container" role="navigation">
      <div className="content">
        <div className="row">

          <div className="header-logo">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <div className="header-social">
            <SocialIcons />
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Header;


