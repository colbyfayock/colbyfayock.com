import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';

import Logo from './Logo';
import SocialIcons from 'components/SocialIcons';

const Header = ({location}) => {

  const [showNotice, updateShowNotice] = useState(false);

  useEffect(() => {
    if ( window.location.search.includes('emailSignup=success') ) {
      updateShowNotice(true);
      setTimeout(() => {
        updateShowNotice(false);
      }, 5000);
    }
  }, []);

  return (
    <>
      {showNotice && (
        <div className="header-notice" onClick={() => updateShowNotice(false)}>
          Thanks for signing up for my newsletter! 🤗
        </div>
      )}
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
    </>
  );
};

export default Header;


