import React from 'react';
import { Helmet } from 'react-helmet';

import { useProjects } from 'hooks';

import Layout from 'components/Layout';
import ArticleList from 'components/ArticleList';

const AllProjects = ({location}) => {

  const { projects } = useProjects();

  const helmet_settings = {
    title: 'All Projects',
    meta: [
      {
        name: 'description',
        content: 'More than you probably want to read...',
      },
      {
        property: 'og:title',
        content: 'All Projects - Colby Fayock',
      },
      {
        property: 'og:description',
        content: 'More than you probably want to read...',
      },
    ],
    bodyAttributes: {
      class: 'page-archive',
    }
  }

  return (
    <Layout location={location}>
      <div className="container">

        <header className="article-header">
          <h1 className="entry-title single-title flat-top" itemProp="headline">
            All Projects
          </h1>
        </header>

        <Helmet {...helmet_settings} />

        <ArticleList count="all" articles={projects} />

      </div>
    </Layout>
  );

}

export default AllProjects;