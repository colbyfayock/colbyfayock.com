import React from 'react'
import Link from 'gatsby-link'

import SocialIcons from './social-icons';

const HeaderLogo = ({path}) => {

    if ( path === '/' ) {
        return (
            <div className="header-logo">
                <h1 className="h1">
                    <Link to="/">
                        Colby Fayock
                    </Link>
                    <span className="tagline">
                        A UX Designer &amp; Front-end Developer Blog
                    </span>
                </h1>
            </div>
        );
    }

    return (
        <div className="header-logo">
            <span className="h1">
                <Link to="/">
                    Colby Fayock
                </Link>
            </span>
        </div>
    );

}

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

export default Header
