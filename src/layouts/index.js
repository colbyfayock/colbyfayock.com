import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from '../components/header';
import Footer from '../components/footer';
import '../assets/scss/main.scss';

import img_favicon_png from '../assets/images/favicon.png';
import img_touchicon_png from '../assets/images/touchicon.png';

const google_tag_manager = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-NJ75NM');
`;

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
    script: [
        {
            type: 'text/javascript',
            innerHTML: google_tag_manager
        }
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

class TemplateWrapper extends React.Component {

    render() {
        return (
            <div>

                <Helmet {...helmet_settings} />

                <Header {...this.props} />

                <div id="main" role="main">
                    { this.props.children() }
                </div>

                <Footer />

            </div>
        );
    }

}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper;
