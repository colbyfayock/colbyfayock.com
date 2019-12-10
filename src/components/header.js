import React from 'react';

import HeaderLogo from './HeaderLogo';
import SocialIcons from './social-icons';

const Header = ({location}) => {
  return (
    <nav className="header container" role="navigation">
      <div className="content">
        <div className="row">

          <HeaderLogo path={location.pathname} />

          <div className="header-social">
            <SocialIcons />
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Header;


