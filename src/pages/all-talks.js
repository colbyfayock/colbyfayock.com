import React from 'react';
import { Helmet } from 'react-helmet';

import { useTalks } from 'hooks';

import Layout from 'components/Layout';
import ArticleList from 'components/ArticleList';

const AllPosts = ({location}) => {

  const { talks } = useTalks();

  const helmet_settings = {
    title: 'All Talks',
    meta: [
      {
        name: 'description',
        content: 'More than you probably want to read...',
      },
      {
        property: 'og:title',
        content: 'All Talks - Colby Fayock',
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
            All Talks
          </h1>
        </header>

        <Helmet {...helmet_settings} />

        <ArticleList count="all" articles={talks} />

      </div>
    </Layout>
  );

}

export default AllPosts;