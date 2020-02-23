import React from 'react';
import Helmet from 'react-helmet';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { usePosts, useTalks } from 'hooks';

import Layout from 'components/layout';
import ArticleList from 'components/ArticleList';

const Index = ({location, data}) => {

  const posts = usePosts();
  const talks = useTalks();

  const helmet_settings = {
    bodyAttributes: {
      class: 'home',
    },
    meta: [
      {
          property: 'og:url',
          content: `https://www.colbyfayock.com`
      },
      {
          property: 'og:type',
          content: 'profile'
      },
      {
          property: 'profile:first_name',
          content: 'Colby'
      },
      {
          property: 'profile:username',
          content: 'colbyfayock'
      }
  ],
  };

  return (
    <Layout location={location}>
      <div className="container">

        <Helmet {...helmet_settings} />

        <Tabs>
          <TabList>
            <Tab>Blog</Tab>
            <Tab>Speaking</Tab>
          </TabList>
          <TabPanel>
            <ArticleList articles={posts} />
          </TabPanel>
          <TabPanel>
            <ArticleList articles={talks} />
          </TabPanel>
        </Tabs>

      </div>
    </Layout>
  );

}

export default Index;