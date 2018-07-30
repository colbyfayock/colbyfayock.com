import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import Layout from '../components/layout';
import BlogList from '../components/blog-list';

const AllPosts = ({location, data}) => {

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

                <BlogList posts_to_show={'all'} posts={data.allMarkdownRemark.edges} />

            </div>
        </Layout>
    );

}

export default AllPosts;

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