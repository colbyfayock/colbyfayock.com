import React from 'react';
import Helmet from 'react-helmet';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { usePosts, useTalks } from 'hooks';

import Layout from 'components/layout';
import ArticleList from 'components/ArticleList';

import websiteSocialCard from 'assets/images/website-social-card.jpg'

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
      },
      {
        property: 'og:image',
        content: websiteSocialCard
      },
      {
        property: 'og:image:secure_url',
        content: websiteSocialCard
      },
      {
        property: 'og:image:width',
        content: 1280
      },
      {
        property: 'og:image:height',
        content: 640
      },
      {
        property: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        property: 'twitter:image',
        content: websiteSocialCard
      },
      {
        property: 'twitter:site',
        content: '@colbyfayock'
      },
      {
        property: 'twitter:creator',
        content: '@colbyfayock'
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