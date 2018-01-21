import React from 'react'
import Link from 'gatsby-link'

import SocialIcons from './social-icons';

const HeaderLogo = ({path}) => {

    if ( path === '/' ) {
        return (
            <div className="nav-logo">
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
        <div className="nav-logo">
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
        <nav id="nav" className="container" role="navigation">

            <div className="content">

                <div className="row">

                    <HeaderLogo path={location.pathname} />

                    <div className="nav-social">
                        <SocialIcons />
                    </div>

                </div>

            </div>

        </nav>
    );
};

export default Header
