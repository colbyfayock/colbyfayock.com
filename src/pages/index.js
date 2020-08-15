import React from 'react';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { usePosts, useTalks } from 'hooks';

import Layout from 'components/Layout';
import Masthead from 'components/Masthead';
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
      <Helmet {...helmet_settings} />

      <Masthead />

      <div className="container">

        <p className="home-newsletter">
          <Link to="/newsletter">
            <span className="tag tag-new">New</span>
            Check out my newsletter!
          </Link>
        </p>

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