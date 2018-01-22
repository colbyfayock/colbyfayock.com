import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import BlogList from '../components/blog-list';

const Index = ({data}) => {

    const helmet_settings = {
        bodyAttributes: {
            class: 'home',
        }
    };

    return (
        <div className="container">

            <Helmet {...helmet_settings} />

            <BlogList posts={data.allMarkdownRemark.edges} />

        </div>
    );

}

export default Index;

export const pageQuery = graphql`
    query IndexQuery {
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