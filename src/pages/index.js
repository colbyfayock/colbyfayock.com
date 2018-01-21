import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import BlogList from '../components/blog-list';

const helmet_settings = {
    bodyAttributes: {
        class: 'page-home',
    }
}

class Index extends React.Component {

    render() {

        return (
            <div className="home container">
                <Helmet {...helmet_settings} />
                <BlogList data={this.props.data} />
            </div>
        )
    }

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
                        path
                        date(formatString: "DD MMMM, YYYY")
                        title
                    }
                }
            }
        }
    }
`;