import React, { useEffect, useState } from 'react';

import HeaderLogo from './HeaderLogo';
import SocialIcons from './social-icons';

const Header = ({location}) => {

  const [notice, updateNotice] = useState();

  useEffect(() => {
    let updatedNotice;

    if ( window.location.search.includes('emailSignup=success') ) {
      updatedNotice = 'Thanks for signing up for my newsletter! 🤗';
    } else if (window.location.search.includes('newsletterUnsubscribe=success')) {
      updatedNotice = 'Sorry to see you go... 😢 Successfully unsubscribed from newsletter!';
    }

    if (updatedNotice) {
      updateNotice(updatedNotice);
      setTimeout(() => {
        updateNotice(undefined);
      }, 5000);
    }
  }, []);

  return (
    <>
      {notice && (
        <div className="header-notice" onClick={() => updateNotice(false)}>
          {notice}
        </div>
      )}
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
    </>
  );
};

export default Header;


