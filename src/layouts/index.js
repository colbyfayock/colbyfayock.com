import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from '../components/header';
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

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Gatsby Default Starter" meta={meta} />
    <Header />
    <div>
      { children() }
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper;
