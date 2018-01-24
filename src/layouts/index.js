import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from '../components/header';
import Footer from '../components/footer';
import '../assets/scss/main.scss';

const TemplateWrapper = (props) => {

    const helmet_settings = {
        title: 'Colby Fayock - A UX Designer & Front-end Developer Blog',
        meta: [
            {
                name: 'description',
                content: 'A UX Designer &amp; Front-end Developer Blog'
            }
        ],
    };

    return (
        <div>

            <Helmet {...helmet_settings} />

            <Header {...props} />

            <div id="main" role="main">
                { props.children() }
            </div>

            <Footer />

        </div>
    )

}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper;
