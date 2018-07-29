import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

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

                <BlogList posts={data.allMarkdownRemark.edges} />

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
                        path
                        categories
                    }
                }
            }
        }
    }
`;