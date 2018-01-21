import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from '../components/header';
import Footer from '../components/footer';
import '../styles/main.scss';

const meta = [
    {
        name: 'description',
        content: 'Sample'
    },
    {
        name: 'keywords',
        content: 'sample, something'
    },
]

const TemplateWrapper = (props) => {

    return (
        <div>

            <Helmet title="Gatsby Default Starter" meta={meta} />

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
