import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from 'components/header';
import Footer from 'components/footer';
import 'assets/scss/main.scss';

import img_favicon_png from 'assets/images/favicon.png';
import img_touchicon_png from 'assets/images/touchicon.png';

const helmet_settings = {
    title: 'Colby Fayock - A UX Designer & Front-end Developer Blog',
    meta: [
        {
            name: 'description',
            content: 'Blog, notes, projects, and such'
        },
        {
            property: 'og:title',
            content: 'Colby Fayock - A UX Designer & Front-end Developer Blog',
        },
        {
            property: 'og:description',
            content: 'Blog, notes, projects, and such',
        },
        {
            property: 'og:url',
            content: 'url',
        },
        {
            property: 'og:site_name',
            content: 'Colby Fayock',
        },
    ],
    link: [
        {
            rel: 'icon',
            type: 'image/png',
            href: img_favicon_png,
        },
        {
            rel: 'apple-touch-icon-precomposed',
            type: 'image/png',
            href: img_touchicon_png,
        },
    ],
};

const TemplateWrapper = ({children, location}) => {

    return (
        <div>

            <Helmet {...helmet_settings} />

            <Header location={location} />

            <div id="main" role="main">
                { children }
            </div>

            <Footer />

        </div>
    );

}

TemplateWrapper.propTypes = {
  children: PropTypes.object,
  location: PropTypes.object,
}

export default TemplateWrapper;
