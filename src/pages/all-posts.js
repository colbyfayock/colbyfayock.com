import React from 'react';
import Helmet from 'react-helmet';

import { usePosts } from 'hooks';

import Layout from 'components/layout';
import ArticleList from 'components/ArticleList';

const AllPosts = ({location}) => {

  const posts = usePosts();

  const helmet_settings = {
    title: 'All Posts - Colby Fayock',
    meta: [
      {
        name: 'description',
        content: 'More than you probably want to read...',
      },
      {
        property: 'og:title',
        content: 'All Posts - Colby Fayock',
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
            All Posts
          </h1>
        </header>

        <Helmet {...helmet_settings} />

        <ArticleList count="all" articles={posts} />

      </div>
    </Layout>
  );

}

export default AllPosts;