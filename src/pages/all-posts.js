import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import BlogList from '../components/blog-list';

const AllPosts = ({data}) => {

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
        <div className="container">

            <header className="article-header">

                <h1 className="entry-title single-title flat-top" itemprop="headline">
                    All Posts
                </h1>

            </header>

            <Helmet {...helmet_settings} />

            <BlogList posts_to_show={'all'} posts={data.allMarkdownRemark.edges} />

        </div>
    );

}

export default AllPosts;

export const pageQuery = graphql`
    query AllPostsQuery {
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