import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Layout from '../components/layout';
import BlogList from '../components/blog-list';

const Index = ({location, data}) => {

  const helmet_settings = {
    bodyAttributes: {
      class: 'home',
    }
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
            <BlogList posts={data.allMarkdownRemark.edges} />
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
        </Tabs>

      </div>
    </Layout>
  );

}

export default Index;

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: {
        fields: [frontmatter___date],
        order: DESC
      }
    )
    {
      edges {
        node {
          excerpt
          frontmatter {
            template
            title
            date(formatString: "DD MMMM, YYYY")
            category
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;